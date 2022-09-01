import { Button, Group, Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HydratedDocument } from "mongoose";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/form/text-input";
import Layout from "../../../components/layout/layout";
import { IPet } from "../../../models/pet";

export default function EditPet() {
  const router = useRouter();
  const { query } = useRouter();
  const id = query.id as string;

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["pet", id],
    async () => {
      const response = await fetch(`/api/pets/${id}`);
      const pet = await response.json();
      return pet;
    },
    {
      enabled: !!id,
    }
  );

  const mutate = useMutation(
    async (pet: IPet) => {
      const response = await fetch(`/api/pets/${id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      });

      return (await response.json()) as HydratedDocument<IPet>;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["pets"]);
      },
    }
  );

  const { control, handleSubmit, reset } = useForm<IPet>({
    defaultValues: {
      name: "",
      species: "",
    },
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <Layout headerContent={<Title order={1}>Edit Pet</Title>}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await mutate.mutateAsync(data);
            await router.push(`/pets/${id}`);
          } catch (e) {
            console.log(e);
          }
        })}
      >
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
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Layout>
  );
}
