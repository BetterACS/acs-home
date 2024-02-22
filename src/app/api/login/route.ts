import { connectDB, disconnectDB } from '../../../server/db';
//../../../database/models
import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../database/models';
async function loginFunction(request: NextRequest) {
	let client;
	try {
		// const { email, password, display_name, created_at, reset_token, reset_token_expire, coin, role, discord_id } =
		// 	await request.json();
		// const { email, password, display_name, discord_id, coin } = await request.json();
		client = await connectDB();
		const email = request.nextUrl.searchParams.get('email') || '';
		const discord_id = request.nextUrl.searchParams.get('discord_id') || '';
		const display_name = request.nextUrl.searchParams.get('display_name') || '';
		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			//console.log('amhere');
			existingUser.display_name = display_name;
			await existingUser.save();
			return NextResponse.redirect(new URL('/', request.url));
		} else {
			// If the user doesn't exist, create a new user
			const redirectUrl = `/login/?display_name=${display_name}&discord_id=${discord_id}&email=${email}`;
			return NextResponse.redirect(new URL(redirectUrl, request.url));
		}
	} catch (error) {
		console.error('Error login user:', error);
		return NextResponse.json({ message: 'Fail to login user' }, { status: 500 });
	} finally {
		if (client) {
			await disconnectDB();
		}
	}
}

export { loginFunction as GET };

// await UserModel.create({
// 	email,
// 	password,
// 	display_name,
// 	created_at,
// 	reset_token,
// 	reset_token_expire,
// 	coin,
// 	role,
// 	discord_id,
// });
