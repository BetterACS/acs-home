import { z } from 'zod';
import { publicProcedure, router } from "./trpc";
export const appRouter = router({
    test: publicProcedure.query(async () => {
        return {
            message: 'Hello world! if you see this, it means that trpc is working!'
        }
    }),
    hello: publicProcedure.input(z.string()).mutation(async (input) => {
        return {
            message: `Hello, ${input}!`
        }
    })
})

export type AppRouter = typeof appRouter;