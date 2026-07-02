"use client";

import { Button, Group, Paper } from "@mantine/core";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../../components/form/text-input";
import Layout from "../../../../components/layout/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import Header from "../../../../components/header";
import { trpc } from "../../../../utils/trpc";
import {
  type CreatePetInput,
  createPetSchema,
} from "../../../../schema/pet.schema";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPet({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { data } = trpc.pets.getPet.useQuery({ id });

  const mutate = trpc.pets.editPet.useMutation();

  const { control, handleSubmit } = useForm<CreatePetInput>({
    defaultValues: data,
    resolver: zodResolver(createPetSchema),
  });

  return (
    <Layout headerContent={<Header variant={1}>Edit Pet</Header>}>
      <form
        onSubmit={handleSubmit(async (formData) => {
          try {
            await mutate.mutateAsync({ data: formData, id });
            await router.push(`/pets/${id}`);
          } catch (e: any) {
            notifications.show({
              title: "Default notification",
              message: e,
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
