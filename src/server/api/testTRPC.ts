import { publicProcedure } from '../trpc';

export default function apiTest() {
	return {
		test: publicProcedure.query(async () => {
			return {
				message: 'Hello world! if you see this, it means that trpc is working!',
			};
		}),
	};
}
