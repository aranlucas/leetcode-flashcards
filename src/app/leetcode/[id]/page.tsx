import { join } from "path";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import LeetcodeDetail from "./leetcode-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Post({ params }: Props) {
  const { id } = await params;
  const contentDirectory = join(process.cwd(), "content/questions");
  const fullPath = join(contentDirectory, `${id}/question.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const mdxSource: MDXRemoteSerializeResult = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: { format: "md" },
  });

  return <LeetcodeDetail id={id} mdxSource={mdxSource} />;
}
