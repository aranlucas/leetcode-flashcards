import Layout from "../../components/layout/layout";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../components/table";
import { Button } from "@mantine/core";
import NextLink from "next/link";
import Header from "../../components/header";
import { trpc } from "../../utils/trpc";
import { CreatePetInput } from "../../schema/pet.schema";

export default function AllPets() {
  const { data, isLoading } = trpc.pets.getAll.useQuery();
  const columnHelper = createColumnHelper<CreatePetInput & { id: string }>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <NextLink href={`/pets/${(info.row.original.id ?? "").toString()}`}>
          {info.getValue()}
        </NextLink>
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
          <Button legacyBehavior component={NextLink} href={`/pets/new`}>
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
