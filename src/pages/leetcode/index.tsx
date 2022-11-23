import { createColumnHelper } from "@tanstack/react-table";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import Table from "../../components/table";
import { getQuestions, Question } from "../../lib/leetcode";

export const getStaticProps: GetStaticProps = async () => {
  const questions = getQuestions();
  return {
    props: {
      questions,
    },
  };
};

export default function IndexPage({
  questions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const columnHelper = createColumnHelper<Question & { id: string }>();

  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => (
        <Link href={`/leetcode/${(info.row.original.slug ?? "").toString()}`}>
          {info.getValue()}
        </Link>
      ),
    }),
  ];

  return (
    <Layout>
      <Table items={questions ?? []} columnDefinitions={columns} />
    </Layout>
  );
}
