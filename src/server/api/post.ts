import { PostModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

export default function createPost() {
	return {
		post: publicProcedure
			.input(
				z.object({
					title: z.string(),
					post_text: z.string(),
					due_date: z.coerce.date(),
					coin_reward: z.number(),
					type: z.string(),
					user_id: z.string(),
				})
			)
			.mutation(async ({ input }) => {
				await connectDB();
				const { title, post_text, due_date, coin_reward, type, user_id } = input;
				console.log('input:', input);
				try {
					const newPost = new PostModel({
						title: title,
						post_text: post_text,
						due_date: due_date,
						coin_reward: coin_reward,
						type: type,
						user_id: user_id,
					});
					const savedPost = await newPost.save();

					return { status: 200, data: { message: 'success to create post', _id: savedPost._id } };
				} catch (error) {
					console.error('Error to create post:', error);
					return { status: 500, data: { message: 'Fail to create post', _id: '' } };
				}
			}),
	};
}
