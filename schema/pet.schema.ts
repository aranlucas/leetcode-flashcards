import z from "zod";

export const createPetSchema = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
});

export type CreatePetInput = z.TypeOf<typeof createPetSchema>;

export const getPetSchema = z.object({
  id: z.string(),
});
