"use client";

import { Button, Group, Paper } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/form/text-input";
import Layout from "../../../components/layout/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import Header from "../../../components/header";
import { trpc } from "../../../utils/trpc";
import { type CreatePetInput, createPetSchema } from "../../../schema/pet.schema";

export default function NewPet() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const mutate = trpc.pets.createPet.useMutation({
    onSuccess: async () => {
      notifications.show({
        title: "Created Pet",
        message: "Created Pet",
      });
      await utils.pets.getAll.invalidate();
    },
  });

  const { control, handleSubmit } = useForm<CreatePetInput>({
    defaultValues: {
      name: "",
      species: "",
    },
    resolver: zodResolver(createPetSchema),
  });

  return (
    <Layout
      headerContent={
        <Header variant={1} description="Create a new pet">
          Create Pet
        </Header>
      }
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const pet = await mutate.mutateAsync(data);
            await router.push(`/pets/${pet.id}`);
          } catch (e: any) {
            notifications.show({
              title: "Default notification",
              message: JSON.stringify(e),
            });
          }
        })}
      >
        <Paper radius="md" p="md" withBorder>
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
        </Paper>
        <Group justify="right" mt="md">
          <Button
            variant="subtle"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Layout>
  );
}
