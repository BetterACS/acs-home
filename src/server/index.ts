import login from './api/login';
import register from './api/register';
import apiTest from './api/testTRPC';
import { createCallerFactory, router } from './trpc';
export const appRouter = router({
	...apiTest(),
	...login(),
	...register(),
});
const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
export type AppRouter = typeof appRouter;
