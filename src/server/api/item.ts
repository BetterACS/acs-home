import { ItemModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { publicProcedure } from '../trpc';

function getItem() {
	return {
		getItem: publicProcedure.query(async () => {
			await connectDB();
			try {
				const existingItems = await ItemModel.find({});
				if (existingItems) {
					return { status: 200, data: { message: 'Query success', data: existingItems } };
				}
				return { status: 404, data: { message: 'No items found', data: [] } };
			} catch (error) {
				console.error('Error querying items:', error);
				return { status: 500, data: { message: 'Failed to query', data: [] } };
			}
		}),
	};
}

export { getItem };
