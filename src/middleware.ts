import { NextRequest, NextResponse } from 'next/server';
import { isLogin } from './utils/Token';
export async function middleware(request: NextRequest) {
	if (await isLogin(request)) {
		if (request.nextUrl.pathname.startsWith('/jack')) {
			return NextResponse.redirect(new URL('/', request.url));
		}
		if (request.nextUrl.pathname.startsWith('/auth/discord/callback')) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}
}

// export const config = {
// 	matcher: '/',
// };
