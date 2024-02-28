import login from './api/login';
import register from './api/register';
import apiSecondTest from './api/secondTestTRPC';
import apiTest from './api/testTRPC';

import { createCallerFactory, router } from './trpc';
export const appRouter = router({
	...apiTest(),
	...apiSecondTest(),
	...login(),
	...register(),
});
const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
export type AppRouter = typeof appRouter;
