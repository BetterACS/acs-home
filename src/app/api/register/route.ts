import { connectDB } from '../../../server/db';

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../database/models';

async function registerFunction(request: NextRequest) {
	let client;
	try {
		client = await connectDB();
		const { email, password, display_name, coin, discord_id } = await request.json();

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = new UserModel({
			email: email,
			password: hashedPassword,
			display_name: display_name,
			coin: coin,
			discord_id: discord_id,
		});
		await newUser.save();

		return NextResponse.json({ message: 'create user successfuly' }, { status: 200 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ message: 'Fail to create user' }, { status: 500 });
	} finally {
		// if (client) {
		// 	await disconnectDB();
		// }
	}
}

export { registerFunction as POST };
