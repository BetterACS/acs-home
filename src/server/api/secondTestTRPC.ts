import { publicProcedure } from '../trpc';

export default function apiSecondTest() {
	return {
		hellothere: publicProcedure.query(async () => {
			return {
				data: { status: 200, message: 'Hello world!' },
			};
		}),
	};
}
