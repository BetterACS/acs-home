import { BookmarkModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

function createBookMark() {
	return {
		createBookMark: publicProcedure
			.input(
				z.object({
					post_id: z.string(),
					user_id: z.string(),
				})
			)
			.mutation(async ({ input }) => {
				await connectDB();
				const { post_id, user_id } = input;
				try {
					// Create the bookmark object dynamically
					const bookmarkData: { post_id: string; user_id: string } = { post_id, user_id };

					const newBookMark = new BookmarkModel(bookmarkData);
					const savedBookMark = await newBookMark.save();
					return { status: 200, data: { message: 'success to create bookmark', _id: savedBookMark._id } };
				} catch (error) {
					console.error('Error to create bookmark:', error);
					return { status: 500, data: { message: 'Fail to create bookmark', _id: '' } };
				}
			}),
	};
}

// function getBookMark() {
//     return {
//       getBookMark: publicProcedure
//         .input(
//           z.object({
//             post_id: z.string(),
//             user_id: z.string(),
//             type: z.string(),
//           })
//         )
//         .query(async ({ input }) => {
//           await connectDB();
//           const { post_id, user_id, type } = input;
//           console.log('Fetching bookmark with Post ID:', post_id, 'User ID:', user_id, 'and Type:', type);
//           try {
//             // const bookmark = await BookmarkModel.findOne({ post_id, user_id, type }).populate('post_id');
//             const bookmark = await BookmarkModel.findOne({ post_id, user_id});
//             console.log('query_', bookmark)
//             console.log('bookmark_pop',bookmark.populate('post_id'))
//             if (!bookmark) {
//               return { status: 404, data: { message: 'Bookmark not found', post: null } };
//             }
//             if (bookmark.type !== type) {
//               return { status: 400, data: { message: 'Incorrect type', post: null } };
//             }
//             return { status: 200, data: { message: 'Bookmark found', post:bookmark } };
//           } catch (error) {
//             console.error('Error retrieving bookmark:', error);
//             return { status: 500, data: { message: 'Fail to retrieve bookmark', post: null } };
//           }
//         }),
//     };
//   }

function getBookMark() {
	return {
		getBookMark: publicProcedure
			.input(
				z.object({
					post_id: z.string(),
					user_id: z.string(),
					type: z.string(),
				})
			)
			.query(async ({ input }) => {
				await connectDB();
				const { post_id, user_id, type } = input;
				// console.log('Fetching bookmark with Post ID:', post_id, 'User ID:', user_id, 'and Type:', type);
				try {
					const bookmark = await BookmarkModel.findOne({ post_id, user_id }).populate('post_id');
					console.log('query_', bookmark);
					if (!bookmark) {
						return { status: 404, data: { message: 'Bookmark not found', bookmark: null, post: null } };
					}
					return { status: 200, data: { message: 'Bookmark found', bookmark: bookmark, post: null } };
				} catch (error) {
					console.error('Error retrieving bookmark:', error);
					return { status: 500, data: { message: 'Fail to retrieve bookmark', bookmark: null, post: null } };
				}
			}),
	};
}

function deleteBookMark() {
	return {
		deleteBookMark: publicProcedure
			.input(
				z.object({
					_id: z.string(),
				})
			)
			.mutation(async ({ input }) => {
				await connectDB();
				const { _id } = input;
				try {
					const result = await BookmarkModel.findByIdAndDelete(_id);
					if (!result) {
						return { status: 404, data: { message: 'Bookmark not found' } };
					}
					return { status: 200, data: { message: 'Bookmark deleted successfully' } };
				} catch (error) {
					console.error('Error deleting bookmark:', error);
					return { status: 500, data: { message: 'Fail to delete bookmark' } };
				}
			}),
	};
}

export { createBookMark, deleteBookMark, getBookMark };
