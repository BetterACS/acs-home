import { caller } from '@/server';
import { generateRandomString } from '@/utils/password';
import { NextRequest, NextResponse } from 'next/server';

async function getDiscordCode(request: NextRequest) {
	const code = request.nextUrl.searchParams.get('code') || '';
	console.log('code:', code);
	const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || '';
	const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || '';
	const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || '';
	const params = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		code,
		redirect_uri: DISCORD_REDIRECT_URI,
	});

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/x-www-form-urlencoded',
	};

	const response = await fetch('https://discord.com/api/v9/oauth2/token', {
		method: 'POST', // Specify the method as POST
		headers: headers, // Set headers
		body: params.toString(), // Convert params to string and set as body
	});

	if (response.ok) {
		const responseData = await response.json();
		const userResponse = await fetch('https://discord.com/api/v9/users/@me', {
			headers: {
				authorization: `Bearer ${responseData.access_token}`,
			},
		});
		if (!userResponse.ok) {
			console.error('Failed to fetch user:', userResponse.statusText);
			return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
		}
		const userResponseData = await userResponse.json();
		console.log('userResponse:', userResponseData);

		const loginResult = await caller.login({
			email: userResponseData.email,
			display_name: userResponseData.username,
			discord_id: userResponseData.id,
		});

		// We create a new user
		if (loginResult.status === 404) {
			await caller.register({
				email: userResponseData.email,
				display_name: userResponseData.username,
				discord_id: userResponseData.id,
				coin: 0,
				password: generateRandomString(10),
			});
		} else if (loginResult.status === 200) {
			// set cookie here
			const cookieValue = userResponseData.id; // Set your desired cookie value
			const cookieOptions = {
				maxAge: 24 * 60 * 60, // Cookie will expire in 24 hours
				path: '/', // Cookie will be accessible from all paths
				httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
				sameSite: 'strict', // Cookie is not sent along with cross-origin requests
				secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS in production
			};

			const cookieHeader = `Set-Cookie=${encodeURIComponent('auth')}=${encodeURIComponent(
				cookieValue
			)}; ${Object.entries(cookieOptions)
				.map(([key, value]) => `${key}=${value}`)
				.join('; ')}`;
			const headers = { 'Set-Cookie': cookieHeader };

			// Redirect to the home page with the cookie set
			return NextResponse.redirect(new URL('/', request.url), { headers });
		} else {
			console.error('Failed to login:', loginResult.data.message);
			return NextResponse.json({ message: 'Failed to login' }, { status: 500 });
		}

		// Redirect to the home page with the cookie set
		return NextResponse.redirect(new URL('/', request.url), { headers });
	} else {
		console.error('Failed to fetch token:', response.statusText);
	}

	return NextResponse.json({ message: 'Failed to fetch data from discord' }, { status: 500 });
}

export { getDiscordCode as GET, getDiscordCode as POST };
