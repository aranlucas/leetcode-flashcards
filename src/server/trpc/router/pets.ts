import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createPetSchema, getPetSchema } from "../../../schema/pet.schema";

import { router, publicProcedure } from "../trpc";

export const petsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.pets.findMany();
  }),
  getPet: publicProcedure.input(getPetSchema).query(async ({ input, ctx }) => {
    const { id } = input;

    const pet = await ctx.prisma.pets.findUnique({
      where: {
        id,
      },
    });

    if (!pet) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Note with that ID not found",
      });
    }

    return pet;
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
