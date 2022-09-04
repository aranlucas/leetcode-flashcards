import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { IPet } from "../../models/pet";
import petKeys from "./petKeys";

export const getPet = async ({ id }: { id: string }): Promise<IPet> => {
  return await axios.get(`/api/pets/${id}`);
};

function useGetPet(id: string) {
  return useQuery(
    petKeys.detail(id),
    async () => {
      return await getPet({ id });
    },
    {
      enabled: !!id,
    }
  );
}

export default useGetPet;
