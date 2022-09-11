import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import Header from "../../../components/header";
import Layout from "../../../components/layout/layout";
import { trpc } from "../../../utils/trpc";

export default function ViewPet() {
  const { query } = useRouter();
  const id = String(query.id);

  const { data } = trpc.useQuery(["pets.getPet", { id }]);

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
      <Paper radius="md" p="md" withBorder>
        <Stack>
          <Header variant={2}>Pet details</Header>
          <Group>Name: {data?.name}</Group>
          <Group>Owner name: {data?.owner_name}</Group>
          <Group>Species: {data?.species}</Group>
        </Stack>
      </Paper>
    </Layout>
  );
}
