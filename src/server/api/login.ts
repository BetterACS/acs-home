import { UserModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

export default function login() {
	return {
		login: publicProcedure
			.input(
				z.object({
					email: z.string(),
					discord_id: z.string(),
					display_name: z.string(),
					avatar: z.string(),
				})
			)
			.mutation(async ({ input }) => {
				await connectDB();
				const { email, discord_id, display_name, avatar } = input;
				try {
					const existingUser = await UserModel.findOne({ email });

					if (existingUser) {
						existingUser.display_name = display_name;
						await existingUser.save();

						return { status: 200, data: { message: 'Login success' } };
					}

					// No user found
					return { status: 404, data: { message: 'User not found' } };
				} catch (error) {
					console.error('Error login user:', error);
					return { status: 500, data: { message: 'Fail to login user' } };
				}
			}),
	};
}
