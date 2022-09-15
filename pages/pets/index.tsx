import Link from "next/link";
import Layout from "../../components/layout/layout";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/table";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Header from "../../components/header";
import { trpc } from "../../utils/trpc";
import { CreatePetInput } from "../../schema/pet.schema";

export default function Index() {
  const { data, isLoading } = trpc.useQuery(["pets.getAll"]);
  const columnHelper = createColumnHelper<CreatePetInput & { id: string }>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <Link href={`/pets/${(info.row.original.id ?? "").toString()}`}>
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
      <Header
        variant={1}
        counter={`(${data?.length ?? "-"})`}
        actions={
          <Button component={NextLink} href={`/pets/new`}>
            Create
          </Button>
        }
      >
        Pets
      </Header>
      <Table
        items={data ?? []}
        columnDefinitions={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}
