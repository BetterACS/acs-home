import { connectDB, disconnectDB } from '../../../server/db';
//../../../database/models
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../database/models';
async function loginFunction(request: NextRequest) {
	await connectDB();
	try {
		// const { email, password, display_name, created_at, reset_token, reset_token_expire, coin, role, discord_id } =
		// 	await request.json();
		const { email, password, display_name, discord_id, coin } = await request.json();
		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			existingUser.display_name = display_name;
			await existingUser.save();
			return NextResponse.json({ message: 'User display name updated' }, { status: 200 });
		} else {
			// If the user doesn't exist, create a new user
			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = new UserModel({
				email: email,
				password: hashedPassword,
				display_name: display_name,
				coin: coin,
				discord_id: discord_id,
			});
			await newUser.save();
			return NextResponse.json({ message: 'User created' }, { status: 201 });
		}

		return NextResponse.json({ message: 'User created' }, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ message: 'Fail to create user' }, { status: 500 });
	} finally {
		disconnectDB();
	}
}

export { loginFunction as POST };

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
