import { Button, Code, Group, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";

export default function Pet() {
  const { query } = useRouter();
  const id = query.id as string;

  const { data, isLoading } = useQuery(
    ["pets", id],
    async () => {
      const response = await fetch(`/api/pets/${id}`);
      const pet = await response.json();
      return pet;
    },
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return "Loading";
  }

  return (
    <Layout
      headerContent={
        <Group position="apart">
          <Title order={1}>{data.name}</Title>
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
