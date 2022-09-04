import { Button, Group, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/form/text-input";
import Layout from "../../../components/layout/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { showNotification } from "@mantine/notifications";
import useEditPet from "../../../hooks/pets/editPet";
import useGetPet from "../../../hooks/pets/getPet";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  species: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function EditPet() {
  const router = useRouter();
  const { query } = useRouter();
  const id = query.id as string;

  const { data } = useGetPet(id);

  const mutate = useEditPet(id);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      species: "",
    },
    resolver: zodResolver(schema),
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
          } catch (e: any) {
            showNotification({
              title: "Default notification",
              message: e,
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
