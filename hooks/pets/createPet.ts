import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HydratedDocument } from "mongoose";
import { axios } from "../../lib/axios";
import { IPet } from "../../models/pet";
import petKeys from "./petKeys";

export const createPet = async ({
  pet,
}: {
  pet: IPet;
}): Promise<HydratedDocument<IPet>> => {
  return await axios.post("/api/pets/", pet);
};

function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation(
    async (pet: IPet) => {
      return await createPet({ pet });
    },
    {
      onSuccess: async () => {
        showNotification({
          title: "Created Pet",
          message: "Created Pet",
        });
        await queryClient.invalidateQueries(petKeys.all);
      },
    }
  );
}

export default useCreatePet;
