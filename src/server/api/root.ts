import { healthRouter } from "~/server/api/routers/health";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

// The API is scaffolded for Phase 2 (accounts and saved progress). Phase 1 serves only a health
// check; nothing on the site calls it yet.
export const appRouter = createTRPCRouter({
	health: healthRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
