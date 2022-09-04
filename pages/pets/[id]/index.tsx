import { Button, Code, Group, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";
import useGetPet from "../../../hooks/pets/getPet";

export default function Pet() {
  const { query } = useRouter();
  const id = query.id as string;

  const { data, isLoading } = useGetPet(id);

  if (isLoading) {
    return "Loading";
  }

  return (
    <Layout
      headerContent={
        <Group position="apart">
          <Title order={1}>{data?.name}</Title>
          <Button component={NextLink} href={`/pets/${id}/edit`}>
            Edit
          </Button>
        </Group>
      }
    >
      <Code block>{JSON.stringify(data, null, 2)}</Code>
    </Layout>
  );
}
