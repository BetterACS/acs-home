import { z } from 'zod';
import { publicProcedure } from '../trpc';
export default function apiTest() {
	return {
		testQuery: publicProcedure.query(async () => {
			return {
				message: 'Hello world! if you see this, it means that trpc is working!',
			};
		}),
		testMutation: publicProcedure
			.input(
				z.object({
					name: z.string(),
				})
			)
			.mutation(async ({ input }) => {
				const { name } = input;
				return {
					message: 'Hi ' + name + '!',
				};
			}),
	};
}
