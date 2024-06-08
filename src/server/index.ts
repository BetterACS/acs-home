import login from './api/login';
import { createPost, getPost } from './api/post';
import register from './api/register';
import apiTest from './api/testTRPC';
import {getUser,getUserBy_id} from './api/user';
import { createCallerFactory, router } from './trpc';
import {createComment,getComment} from './api/comment';
export const appRouter = router({
	...apiTest(),
	...login(),
	...register(),
	...getUser(),
	...createPost(),
	...getPost(),
	...getUserBy_id(),
	...createComment(),
	...getComment(),
});
const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
export type AppRouter = typeof appRouter;
