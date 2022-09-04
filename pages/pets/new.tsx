import { Button, Group, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form/text-input";
import Layout from "../../components/layout/layout";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showNotification } from "@mantine/notifications";
import useCreatePet from "../../hooks/pets/createPet";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  species: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function NewPet() {
  const router = useRouter();

  const mutate = useCreatePet();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      species: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <Layout headerContent={<Title order={1}>Create Pet</Title>}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const pet = await mutate.mutateAsync(data);
            await router.push(`/pets/${pet._id.toString()}`);
          } catch (e: any) {
            showNotification({
              title: "Default notification",
              message: JSON.stringify(e),
            });
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
