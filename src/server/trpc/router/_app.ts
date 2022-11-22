import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { petsRouter } from "./pets";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  pets: petsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
