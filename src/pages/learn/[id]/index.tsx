import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import fs from "fs";
import { Title } from "@mantine/core";
import { MantineMDX } from "../../../components/mdxprovider/mdxprovider";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export default function IndexPage({
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Title order={2}>{mdxSource?.frontmatter?.title} </Title>

      <MantineMDX {...mdxSource} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDirectory = join(process.cwd(), "content/learn");

  const postFilePaths = fs
    .readdirSync(contentDirectory)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));

  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  mdxSource: MDXRemoteSerializeResult;
}> = async ({ params }) => {
  const id = params?.id as string;
  const contentDirectory = join(process.cwd(), "content/learn");

  const fullPath = join(contentDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const mdxSource = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: { development: false },
  });

  return {
    props: {
      mdxSource,
    },
  };
};
