import { createColumnHelper } from "@tanstack/react-table";
import { type GetStaticProps, type InferGetStaticPropsType } from "next";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import Table from "../../components/table";
import { type Question } from "../../lib/leetcode";
import fs from "fs";
import path, { join } from "path";
import matter from "gray-matter";

export const getStaticProps: GetStaticProps = async () => {
  const contentDirectory = join(process.cwd(), "content/questions");

  const postFilePaths = fs.readdirSync(contentDirectory);

  const files = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(
      path.join(contentDirectory, filePath, "question.md")
    );
    const { data } = matter(source);

    return {
      data: {
        title: data.title,
        slug: data.slug,
      },
    };
  });

  return { props: { files } };
};

export default function IndexPage({
  files,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const columnHelper = createColumnHelper<Question & { data: any }>();

  const columns = [
    columnHelper.accessor("data.title", {
      header: () => "Title",
      cell: (info) => (
        <Link
          href={`/leetcode/${(info.row.original.data.slug ?? "").toString()}`}
        >
          {info.getValue()}
        </Link>
      ),
    }),
  ];

  return (
    <Layout>
      <Table items={files ?? []} columnDefinitions={columns} />
    </Layout>
  );
}
