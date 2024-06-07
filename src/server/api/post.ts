import { PostModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

function createPost() {
	return {
		post: publicProcedure
			.input(
				z.object({
					title: z.string(),
					description: z.string(),
					due_date: z.coerce.date(),
					coin_reward: z.number(),
					type: z.string(),
					user_id: z.string(),
					githubLink:z.string().optional(),
				})
			)
			.mutation(async ({ input }) => {
				await connectDB();
				const { title, description, due_date, coin_reward, type, user_id,githubLink } = input;
				console.log('input:', input);
				try {
					const newPost = new PostModel({
						title: title,
						description: description,
						due_date: due_date,
						coin_reward: coin_reward,
						type: type,
						user_id: user_id,
						githubLink:githubLink
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

function getPost() {
	return {
		getPost: publicProcedure
			.input(
				z.object({
					type: z.string(),
				})
			)
			.query(async ({ input }) => {
				await connectDB();
				const { type } = input;
				console.log('Fetching post with ID:', type);
				try {
					const fetchedPosts = await PostModel.find({ type }); // Rename the variable 'post' to 'fetchedPosts'
					if (!fetchedPosts) {
						return { status: 404, data: { message: 'Post not found' } };
					}
					return { status: 200, data: { message: 'Post retrieved successfully', post: fetchedPosts } }; // Update the variable name here as well
				} catch (error) {
					console.error('Error fetching post:', error);
					return { status: 500, data: { message: 'Failed to fetch post' } };
				}
			}),
	};
}

export { createPost, getPost };
