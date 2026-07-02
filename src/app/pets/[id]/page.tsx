"use client";

import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import NextLink from "next/link";
import { use, useState, useEffect } from "react";
import Header from "../../../components/header";
import Layout from "../../../components/layout/layout";
import { trpc } from "../../../utils/trpc";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Pet({ params }: Props) {
  const { id } = use(params);
  const { data } = trpc.pets.getPet.useQuery({ id });

  return (
    <Layout
      headerContent={
        <Group justify="apart">
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
