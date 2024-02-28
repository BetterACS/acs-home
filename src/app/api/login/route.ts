import { connectDB } from '../../../server/db';
//../../../database/models
import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../database/models';

function generateRandomString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomString += characters.charAt(randomIndex);
	}

	return randomString;
}

async function loginFunction(request: NextRequest) {
	let client;
	const password = generateRandomString(10);
	try {
		client = await connectDB();
		const email = request.nextUrl.searchParams.get('email') || '';
		const discord_id = request.nextUrl.searchParams.get('discord_id') || '';
		const display_name = request.nextUrl.searchParams.get('display_name') || '';
		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			existingUser.display_name = display_name;
			await existingUser.save();
			return NextResponse.redirect(new URL('/', request.url));
		} else {
			const body = {
				email: email,
				password: password,
				display_name: display_name,
				discord_id: discord_id,
				coin: 0,
			};
			const response = await fetch(`${process.env.ORIGIN || ''}/api/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			if (response.status === 200) {
				return NextResponse.redirect(new URL('/', request.url));
			}
			return NextResponse.json({ message: 'Fail to login user' }, { status: 500 });
		}
	} catch (error) {
		console.error('Error login user:', error);
		return NextResponse.json({ message: 'Fail to login user' }, { status: 500 });
	} finally {
		// if (client) {
		// 	await disconnectDB();
		// }
	}
}

export { loginFunction as GET };
