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

		const redirectUrl = `/login/?display_name=${userResponseData.global_name}&discord_id=${userResponseData.id}&email=${userResponseData.email}`;
		return NextResponse.redirect(new URL(redirectUrl, request.url));
	} else {
		console.error('Failed to fetch token:', response.statusText);
	}

	return NextResponse.json({ message: 'Failed to fetch data from discord' }, { status: 500 });
}

export { getDiscordCode as GET, getDiscordCode as POST };
