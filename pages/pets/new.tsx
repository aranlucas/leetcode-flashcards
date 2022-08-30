import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form/text-input";
import { IPet } from "../../models/pet";

export default function NewPet() {
  const mutate = useMutation(async (pet: IPet) => {
    return await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });
  });

  const { control, handleSubmit } = useForm<IPet>({
    defaultValues: {
      name: "",
      species: "",
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate.mutate(data))}>
      <TextInput
        control={control}
        name="name"
        label="Your name"
        placeholder="Your name"
      />
      <TextInput
        control={control}
        name="species"
        label="Your species"
        placeholder="Your species"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
