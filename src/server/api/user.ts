import { UserModel } from '@/database/models';
import { connectDB } from '@/server/db';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

function getUser() {
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

function getUserBy_id() {
	return {
		getUserBy_id: publicProcedure
			.input(
				z.object({
					_id: z.string(), // Changed from user_id to _id and z.undefined() to z.string()
				})
			)
			.query(async ({ input }) => {
				await connectDB();
				const { _id } = input; // Changed from user_id to _id
				console.log('user_id:', _id); // Adjusted the console log message
				try {
					const existingUser = await UserModel.findOne({ _id }); // Changed the query to use _id
					if (existingUser) {
						return { status: 200, data: { message: 'query success', data: existingUser } };
					}

					return { status: 404, data: { message: 'User not found', data: undefined } };
				} catch (error) {
					console.error('Error query user:', error);
					return { status: 500, data: { message: 'Fail to query', data: undefined } };
				}
			}),
	};
}
function editUserCoin() {
    return {
        editUserCoin: publicProcedure
            .input(
                z.object({
                    _id: z.string(),
                    newCoinValue: z.number(), // Assuming the new coin value is a number
                })
            )
            .mutation(async ({ input }) => {
                await connectDB();
                const { _id, newCoinValue } = input;

                try {
                    const existingUser = await UserModel.findById(_id);
                    if (!existingUser) {
                        return { status: 404, data: { message: 'User not found' } };
                    }

                    // Update the user's coin value
                    existingUser.coin = newCoinValue;
                    await existingUser.save();

                    return { status: 200, data: { message: 'Coin value updated successfully', data: existingUser } };
                } catch (error) {
                    console.error('Error updating user coin:', error);
                    return { status: 500, data: { message: 'Failed to update coin value' } };
                }
            }),
    };
}

function editUserLastReward() {
    return {
        editUserLastReward: publicProcedure
            .input(
                z.object({
                    _id: z.string(),
                    newDate: z.string(), // Assuming the new coin value is a number
                })
            )
            .mutation(async ({ input }) => {
                await connectDB();
                const { _id, newDate } = input;

                try {
                    const existingUser = await UserModel.findById(_id);
                    if (!existingUser) {
                        return { status: 404, data: { message: 'User not found' } };
                    }

                    // Update the user's coin value
                    existingUser.last_reward = newDate;
                    await existingUser.save();

                    return { status: 200, data: { message: 'last reward value updated successfully', data: existingUser } };
                } catch (error) {
                    console.error('Error updating last reward coin:', error);
                    return { status: 500, data: { message: 'Failed to update last reward value' } };
                }
            }),
    };
}

export { getUser, getUserBy_id,editUserCoin,editUserLastReward };
