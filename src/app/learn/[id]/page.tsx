import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import fs from "fs";
import { Title } from "@mantine/core";
import { MantineMDX } from "../../../components/mdxprovider/mdxprovider";
import Layout from "../../../components/layout/layout";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LearnPage({ params }: Props) {
  const { id } = await params;
  const contentDirectory = join(process.cwd(), "content/learn");
  const fullPath = join(contentDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const mdxSource: MDXRemoteSerializeResult = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: { format: "md" },
  });
  const title = mdxSource.frontmatter?.title as string;

  return (
    <Layout>
      <Title order={2}>{title}</Title>
      <MantineMDX {...mdxSource} />
    </Layout>
  );
}
