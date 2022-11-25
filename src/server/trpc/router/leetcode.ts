import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import gql from "graphql-tag";
import { print } from "graphql";

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
  getNote: publicProcedure
    .input(z.object({ titleSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      const query = gql`
        query QuestionNote($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            note
            __typename
          }
        }
      `;
      const graphqlQuery = {
        query: print(query),
        variables: { titleSlug: input.titleSlug },
      };

      const response = await ctx.leetcode.post("/graphql", graphqlQuery);

      return { note: response.data.data.question.note };
    }),
});
