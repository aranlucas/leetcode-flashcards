import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import gql from "graphql-tag";
import { print } from "graphql";
import dayjs from "dayjs";
import { supermemo, SuperMemoGrade } from "supermemo";

function reviewProblem(problem: any, grade: SuperMemoGrade) {
  const { interval, repetition, efactor } = supermemo(problem, grade);
  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();

  return { ...problem, interval, repetition, efactor, dueDate };
}

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
    .input(z.object({ grade: z.number(), problemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session?.user?.id;
      const { problemId, grade } = input;

      const reviewId = `${id}_${problemId}`;

      const existingReview = await ctx.prisma.review.findUnique({
        where: {
          id: reviewId,
        },
      });

      let review;
      if (existingReview !== null) {
        review = existingReview;
      } else {
        review = {
          id: reviewId,
          problemId,
          authorId: id,
          problemTitle: problemId,
          interval: 0,
          repetition: 0,
          efactor: 2.5,
        };
      }

      review = reviewProblem(review, grade as SuperMemoGrade);

      return ctx.prisma.review.upsert({
        where: {
          id: reviewId,
        },
        create: review,
        update: review,
      });
    }),
});
