import login from './api/login';
import { createPost, getPost ,editPostCoin} from './api/post';
import register from './api/register';
import apiTest from './api/testTRPC';
import {getUser,getUserBy_id,editUserCoin} from './api/user';
import { createCallerFactory, router } from './trpc';
import {createComment,getComment} from './api/comment';
import {createBookMark,getBookMark,deleteBookMark} from './api/bookmark';
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
	...createBookMark(),
	...getBookMark(),
	...deleteBookMark(),
	...editUserCoin(),
	...editPostCoin(),
});
const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
export type AppRouter = typeof appRouter;
