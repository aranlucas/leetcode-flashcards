import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
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
    updateReview: protectedProcedure
    .input(z.object({ grade: z.number(), problemId: z.string()}))
    .mutation( async ({ ctx, input }) => {
      const id = ctx.session?.user?.id;
      const { problemId } = input;
      
      const reviewId = `${id}_${problemId}`;
      return ctx.prisma.review.upsert({
        where: { id: reviewId },
        update: {
          interval: 0,
          repetition: 0,
          efactor: 2.5
        },
        create: {
          id: reviewId, 
          problemId: input.problemId,
          authorId: id!!,
          problemTitle: 'ProblemTitle',
          interval: 0,
          repetition: 0,
          efactor: 2.5
         },
      })
    })
});
