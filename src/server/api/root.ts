import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import userRouter from "./routers/user";
import authRouter from "./routers/auth";
import dashboardRouter from "./routers/dashboard";
import awsRouter from "./routers/aws";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aws: awsRouter,
  auth: authRouter,
  user: userRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
