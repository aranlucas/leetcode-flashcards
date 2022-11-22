import { z } from "zod";
import { createPetSchema, getPetSchema } from "../../../schema/pet.schema";

import { router, publicProcedure } from "../trpc";

export const petsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pets.findMany();
  }),
  getPet: publicProcedure.input(getPetSchema).query(({ input, ctx }) => {
    const { id } = input;

    return ctx.prisma.pets.findUnique({
      where: {
        id,
      },
    });
  }),
  createPet: publicProcedure
    .input(createPetSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.pets.create({ data: input });
    }),
  editPet: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: createPetSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      const { id, data } = input;

      return ctx.prisma.pets.update({
        where: {
          id,
        },
        data,
      });
    }),
});
