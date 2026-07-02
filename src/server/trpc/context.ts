import { type inferAsyncReturnType } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { auth } from "../auth";
import { prisma } from "../client/db";
import { createLeetCodeClient } from "../client/leetcode";

export const createContext = async (_opts: FetchCreateContextFnOptions) => {
  const session = await auth();
  const leetcode = await createLeetCodeClient({
    sessionId: session?.user?.LEETCODE_SESSION ?? "",
    csrf: session?.user?.LEETCODE_CSRF ?? "",
  });
  return { leetcode: leetcode.instance, session, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;
