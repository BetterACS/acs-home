import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const cookies = request.headers.get('Cookie');

	if (cookies) {
		// Split the cookie string into individual cookies
		const cookieArray = cookies.split(';');

		// Loop through each cookie to parse its name and value
		cookieArray.forEach((cookie) => {
			const [name, value] = cookie.split('=');
			console.log('Cookie name:', name.trim());
			console.log('Cookie value:', value.trim());
		});
	} else {
		console.log('No cookies found in the request headers.');
	}
	return NextResponse.next();
}

export const config = {
	matcher: '/',
};
