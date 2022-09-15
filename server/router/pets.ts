import { createRouter } from "./context";
import { z } from "zod";
import { createPetSchema, getPetSchema } from "../../schema/pet.schema";

// https://www.prisma.io/docs/concepts/components/prisma-client/crud
export const petsRouter = createRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.pets.findMany();
    },
  })
  .query("getPet", {
    input: getPetSchema,
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
    input: createPetSchema,
    resolve({ input, ctx }) {
      // use your ORM of choice
      return ctx.prisma.pets.create({ data: input });
    },
  })
  .mutation("editPet", {
    // validate input with Zod
    input: z.object({
      id: z.string(),
      data: createPetSchema,
    }),
    resolve({ ctx, input }) {
      const { id, data } = input;

      return ctx.prisma.pets.update({
        where: {
          id,
        },
        data,
      });
    },
  });
