import login from './api/login';
import createPost from './api/post';
import register from './api/register';
import apiTest from './api/testTRPC';
import getUser from './api/user';
import { createCallerFactory, router } from './trpc';
export const appRouter = router({
	...apiTest(),
	...login(),
	...register(),
	...getUser(),
	...createPost(),
});
const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
export type AppRouter = typeof appRouter;
