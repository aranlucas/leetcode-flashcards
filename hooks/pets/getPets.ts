import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib/axios";
import { IPet } from "../../models/pet";
import petKeys from "./petKeys";

export const getPets = async (): Promise<{ pets: IPet[] }> => {
  return await axios.get("/api/pets");
};

function useGetPets() {
  return useQuery(petKeys.all, async () => {
    const response = await getPets();
    return response;
  });
}

export default useGetPets;
