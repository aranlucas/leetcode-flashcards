import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import path, { join } from "path";
import Layout from "../../components/layout/layout";
import fs from "fs";
import matter from "gray-matter";

export default function IndexPage({
  files,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      {files.map((post: any) => {
        return (
          <Link href={`learn/${post.slug}`} key={post.id}>
            <>
              <h2>{post.data.title}</h2>
            </>
          </Link>
        );
      })}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contentDirectory = join(process.cwd(), "content/learn");

  const postFilePaths = fs
    .readdirSync(contentDirectory)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));

  const files = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(contentDirectory, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
      slug: filePath.substring(0, filePath.length - 3),
    };
  });

  return { props: { files } };
};
