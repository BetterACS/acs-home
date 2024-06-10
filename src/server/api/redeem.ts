
import { ItemModel, RedeemModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

function saveItem() {
    return {
        saveItem: publicProcedure
            .input(
                z.object({
                    item_id: z.string(),
                    user_id: z.string(),
                })
            )
            .mutation(async ({ input }) => {
                await connectDB();
                const { item_id, user_id } = input;

                try {
                    const RedeemData = {
                        item_id: item_id,
                        user_id: user_id,
                    };
                    const newRedeem = new RedeemModel(RedeemData);
                    const savedRedeem = await newRedeem.save();
                    return { status: 200, data: { message: 'Coin value updated successfully', data: savedRedeem } };
                } catch (error) {
                    console.error('Error updating item coin:', error);
                    return { status: 500, data: { message: 'Failed to update coin value' } };
                }
            }),
    };
}

export { saveItem };