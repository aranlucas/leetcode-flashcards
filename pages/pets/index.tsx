import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import Pet, { IPet } from "../../models/pet";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/table";
import { Button, Group, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";

const columnHelper = createColumnHelper<IPet>();

export default function Index({
  pets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <Link href={`/pets/${info.row.original._id.toString()}`}>
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("owner_name", {
      cell: (info) => info.getValue(),
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
      <Table items={pets} columnDefinitions={columns} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pets = await Pet.find({}).limit(20);
  return {
    props: {
      pets: JSON.parse(JSON.stringify(pets)),
    },
  };
};
