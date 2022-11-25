import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const leetCodeRouter = router({
  getSubmissions: publicProcedure
    .input(z.object({ titleSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      const response = await ctx.leetcode.get(
        `/api/submissions/${input.titleSlug}`
      );

      const code = response.data.submissions_dump[0];
      return { ...code };
    }),
});
