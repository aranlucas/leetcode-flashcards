import { Button, Group, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/form/text-input";
import Layout from "../../../components/layout/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { showNotification } from "@mantine/notifications";
import Header from "../../../components/header";
import { trpc } from "../../../utils/trpc";
import { CreatePetInput, createPetSchema } from "../../../schema/pet.schema";

export default function EditPet() {
  const router = useRouter();
  const { query } = useRouter();
  const id = String(query.id);

  const { data } = trpc.pets.getPet.useQuery({ id });

  const mutate = trpc.pets.editPet.useMutation();

  const { control, handleSubmit, reset } = useForm<CreatePetInput>({
    defaultValues: {
      name: "",
      species: "",
    },
    resolver: zodResolver(createPetSchema),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <Layout headerContent={<Header variant={1}>Edit Pet</Header>}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await mutate.mutateAsync({ data, id });
            await router.push(`/pets/${id}`);
          } catch (e: any) {
            showNotification({
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
        <Group position="right" mt="md">
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
