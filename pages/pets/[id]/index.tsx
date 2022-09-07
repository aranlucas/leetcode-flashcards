import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Header from "../../../components/header";
import Layout from "../../../components/layout/layout";
import useGetPet from "../../../hooks/pets/getPet";
import Pet from "../../../models/pet";

export default function ViewPet() {
  const { query } = useRouter();
  const id = query.id as string;

  const { data } = useGetPet(id);

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

// This function gets called at build time
export async function getStaticPaths() {
  const pets = await Pet.find({}).limit(20);

  const paths = pets.map((pet) => {
    return {
      params: { id: pet._id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  const queryClient = new QueryClient();

  const pets = await Pet.findOne({ _id: id });

  const parsedPet = JSON.parse(JSON.stringify(pets));

  await queryClient.prefetchQuery(["pets", id], () => {
    return parsedPet;
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
