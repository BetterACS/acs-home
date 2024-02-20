import { publicProcedure } from '../trpc';

export default function apiTest() {
	return {
		testQuery: publicProcedure.query(async () => {
			return {
				message: 'Hello world! if you see this, it means that trpc is working!',
			};
		}),
		testMutation: publicProcedure.mutation(async () => {
			return {
				message: 'This is a mutation!',
			};
		}),
	};
}
