import { Button, Group, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form/text-input";
import Layout from "../../components/layout/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { showNotification } from "@mantine/notifications";
import Header from "../../components/header";
import { trpc } from "../../utils/trpc";
import { CreatePetInput, createPetSchema } from "../../schema/pet.schema";

export default function NewPet() {
  const router = useRouter();
  const utils = trpc.useContext();

  const mutate = trpc.pets.createPet.useMutation({
    onSuccess: async () => {
      showNotification({
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
            showNotification({
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
