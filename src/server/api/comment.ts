import { CommentModel,UserModel,PostModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

function createComment() {
	return {
		createComment: publicProcedure
			.input(
				z.object({
					post_id: z.string(),
					user_id: z.string(),
					comment_text: z.string(),
					parent_id: z.string().optional(),
				})
			)
			.mutation(async ({ input }) => {
				await connectDB();
				const { post_id, user_id, comment_text, parent_id } = input;
				try {
					// Create the comment object dynamically
					const commentData: { post_id: string; user_id:string;comment_text:string;parent_id?: string } = { post_id, user_id, comment_text};
					
					if (parent_id) {
						commentData.parent_id = parent_id;
					}
					const newComment = new CommentModel(commentData);
					const savedComment = await newComment.save();
					return { status: 200, data: { message: 'success to create comment', _id: savedComment._id } };
				} catch (error) {
					console.error('Error to create comment:', error);
					return { status: 500, data: { message: 'Fail to create comment', _id: '' } };
				}
			}),	
	};
}

async function populateComment(comment:any) {
	await comment.populate('user_id');
	if (comment.parent_id) {
	  await comment.populate('parent_id');
	  await populateComment(comment.parent_id); // Recursively populate the parent comment
	}
	return comment;
  }

  function getComment() {
	return {
	  getComment: publicProcedure
		.input(
		  z.object({
			post_id: z.string(),
		  })
		)
		.query(async ({ input }) => {
		  await connectDB();
		  const { post_id } = input;
		  try {
			const fetchedComments = await CommentModel.find({ post_id });
  
			if (!fetchedComments) {
			  return { status: 404, data: { message: 'Comment not found' } };
			}
  
			// Recursively populate each comment
			const populatedComments = await Promise.all(fetchedComments.map(comment => populateComment(comment)));
  
			return {
			  status: 200,
			  data: { message: 'Comment retrieved successfully', post: populatedComments },
			};
		  } catch (error) {
			console.error('Error fetching post:', error);
			return { status: 500, data: { message: 'Failed to fetch post' } };
		  }
		}),
	};
  }
  

export { createComment,getComment};