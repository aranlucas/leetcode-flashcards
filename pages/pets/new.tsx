import { Button, Group, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { HydratedDocument } from "mongoose";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form/text-input";
import Layout from "../../components/layout/layout";
import { IPet } from "../../models/pet";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
});

export default function NewPet() {
  const router = useRouter();

  const mutate = useMutation(async (pet: IPet) => {
    const response = await fetch("/api/pets", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });

    return (await response.json()) as HydratedDocument<IPet>;
  });

  const { control, handleSubmit } = useForm<IPet>({
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
