import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
//https://github.com/vercel/next.js/discussions/38202#discussioncomment-3058232
async function generateToken(discordId: string): Promise<string> {
	const secret = process.env.SECRET_KEY || '';
	const payload = {
		discordId: discordId,
	};

	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7; // expire in 1 week

	return new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(secret));
}
async function verifyToken(token: string) {
	try {
		const secret = process.env.SECRET_KEY || '';
		const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
		// run some checks on the returned payload, perhaps you expect some specific values

		// if its all good, return it, or perhaps just return a boolean
		return payload;
	} catch (error) {
		console.error('Error verifying token:', error);
		return undefined;
	}
}

async function creteCookies(discordId: string, cookiesName: string) {
	// set cookie here
	const cookieValue = await generateToken(discordId); // Set your desired cookie value
	const cookieOptions = {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Cookie will expire in 1 week
		path: '/', // Cookie will be accessible from all paths
		httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
		sameSite: 'strict', // Cookie is not sent along with cross-origin requests
		secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS in production
	};

	const cookieHeader = `${cookiesName}=${encodeURIComponent(cookieValue)}; ${Object.entries(cookieOptions)
		.map(([key, value]) => `${key}=${value}`)
		.join('; ')}`;
	return cookieHeader;
}

async function isLogin(request: NextRequest) {
	// check if user is login
	const allCookies = request.cookies;
	// console.log(allCookies.get('Set-Cookie'));
	if (allCookies.has('Set-Cookie')) {
		const auth_cookies = allCookies.get('Set-Cookie') || { name: '', value: '' };
		const token = await verifyToken(auth_cookies.value);

		if (token !== undefined || token !== null || token !== '') {
			return true;
		}
	}
	return false;
}
export { creteCookies, generateToken, isLogin, verifyToken };
