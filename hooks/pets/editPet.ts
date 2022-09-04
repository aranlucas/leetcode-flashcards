import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { IPet } from "../../models/pet";
import petKeys from "./petKeys";

export const editPet = async ({
  id,
  pet,
}: {
  id: string;
  pet: IPet;
}): Promise<IPet> => {
  return await axios.put(`/api/pets/${id}`, pet);
};

function useEditPet(id: string) {
  const queryClient = useQueryClient();

  return useMutation(
    async (pet: IPet) => {
      return await editPet({ id, pet });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(petKeys.all);
      },
    }
  );
}

export default useEditPet;
