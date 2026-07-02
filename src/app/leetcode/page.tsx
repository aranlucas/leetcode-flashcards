import fs from "fs";
import path, { join } from "path";
import matter from "gray-matter";
import Layout from "../../components/layout/layout";
import LeetcodeList from "./leetcode-list";

export default async function IndexPage() {
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

  return (
    <Layout>
      <LeetcodeList files={files} />
    </Layout>
  );
}
