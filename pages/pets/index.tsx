import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import Pet, { IPet } from "../../models/pet";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/table";
import { Button, Group, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

const columnHelper = createColumnHelper<IPet>();

export default function Index() {
  const { data } = useQuery(["pets"], async () => {
    const response = await fetch("/api/pets");
    const pets = await response.json();
    return pets;
  });

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <Link href={`/pets/${info.row.original._id.toString()}`}>
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("species", {
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <Layout>
      <Group position="apart">
        <Title order={1}>Pets</Title>
        <Button component={NextLink} href={`/pets/new`}>
          Create
        </Button>
      </Group>
      <Table items={data.pets} columnDefinitions={columns} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const pets = await Pet.find({}).limit(20);

  const parsedPets = JSON.parse(JSON.stringify(pets));

  await queryClient.prefetchQuery(["pets"], () => {
    return { pets: parsedPets };
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
