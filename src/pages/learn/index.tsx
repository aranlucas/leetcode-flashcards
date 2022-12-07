import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Layout from "../../components/layout/layout";

const importBlogPosts = async () => {
  // https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
  // second flag in require.context function is if subdirectories should be searched
  const markdownFiles = require
    .context("/content/learn", false, /\.\/.*\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return await Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../../../content/learn/${path}`);
      return {
        attributes: markdown.attributes,
        slug: path.substring(0, path.length - 3),
      };
    })
  );
};

export default function IndexPage({
  files,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      {files.map((post: any) => {
        return (
          <Link href={`learn/${post.slug}`} key={post.id}>
            <>
              <h2>{post.attributes.title}</h2>
            </>
          </Link>
        );
      })}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = await importBlogPosts();
  return {
    props: {
      files,
    },
  };
};
