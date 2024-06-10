import { ItemModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

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

function editItem() {
    return {
        editItem: publicProcedure
            .input(
                z.object({
                    _id: z.string(),
                    quantity: z.number(),
                })
            )
            .mutation(async ({ input }) => {
                await connectDB();
                const { _id, quantity } = input;

                try {
                    const existingItem = await ItemModel.findById(_id);
                    if (!existingItem) {
                        return { status: 404, data: { message: 'Item not found' } };
                    }
                    // Update the item's coin value
                    existingItem.quantity = quantity;
                    await existingItem.save();

                    return { status: 200, data: { message: 'Coin value updated successfully', data: existingItem } };
                } catch (error) {
                    console.error('Error updating item coin:', error);
                    return { status: 500, data: { message: 'Failed to update coin value' } };
                }
            }),
    };
}

export { getItem,editItem };
