import apiSecondTest from './api/secondTestTRPC';
import apiTest from './api/testTRPC';
import { router } from './trpc';
export const appRouter = router({
	...apiTest(),
	...apiSecondTest(),
});

export type AppRouter = typeof appRouter;
