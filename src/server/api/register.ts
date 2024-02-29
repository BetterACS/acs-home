import { UserModel } from '@/database/models';
import { connectDB } from '@/server/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

export default function register() {
	return {
		register: publicProcedure
			.input(
				z.object({
					email: z.string(),
					password: z.string(),
					display_name: z.string(),
					discord_id: z.string(),
					coin: z.number(),
				})
			)
			.mutation(async ({ input }) => {
				const { email, password, display_name, coin, discord_id } = input;
				try {
					await connectDB();
					const hashedPassword = await bcrypt.hash(password, 12);
					const newUser = new UserModel({
						email: email,
						password: hashedPassword,
						display_name: display_name,
						coin: coin,
						discord_id: discord_id,
					});
					await newUser.save();
					return {
						status: 200,
						data: { message: 'create user successfuly' },
					};
				} catch (error) {
					console.error('Error creating user:', error);
					return {
						status: 500,
						data: { message: 'Fail to create user' },
					};
				}
			}),
	};
}
