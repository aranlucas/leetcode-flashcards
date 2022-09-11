import { createRouter } from "./context";
import { z } from "zod";

// https://www.prisma.io/docs/concepts/components/prisma-client/crud
export const petsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.pets.findMany();
    },
  })
  .query("getPet", {
    input: z.object({
      id: z.string(),
    }),
    resolve({ input, ctx }) {
      const { id } = input;
      return ctx.prisma.pets.findUnique({
        where: {
          id,
        },
      });
    },
  })
  .mutation("createPet", {
    // validate input with Zod
    input: z.object({ name: z.string(), species: z.string() }),
    async resolve({ input, ctx }) {
      // use your ORM of choice
      return ctx.prisma.pets.create({ data: input });
    },
  })
  .mutation("editPet", {
    // validate input with Zod
    input: z.object({
      id: z.string(),
      data: z.object({ name: z.string(), species: z.string() }),
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;

      return ctx.prisma.pets.update({
        where: {
          id,
        },
        data,
      });
    },
  });
