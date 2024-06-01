import { UserModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

export default function getUser() {
	return {
		getUser: publicProcedure
			.input(
				z.object({
					discord_id: z.string(),
				})
			)
			.query(async ({ input }) => {
				await connectDB();
				const { discord_id } = input;
				//console.log('discord_id:', discord_id);
				try {
					const existingUser = await UserModel.findOne({ discord_id });
					//console.log('existingUser:', existingUser);
					if (existingUser) {
						//console.log('existingUser:', existingUser);
						return { status: 200, data: { message: 'query success', data: existingUser } };
					}

					// No user found
					return { status: 404, data: { message: 'User not found' } };
				} catch (error) {
					console.error('Error query user:', error);
					return { status: 500, data: { message: 'Fail to query' } };
				}
			}),
	};
}
