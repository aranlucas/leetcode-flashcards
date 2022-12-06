import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";

export default function IndexPage({
  blogpost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <pre>{JSON.stringify(blogpost, null, 2)}</pre>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownFiles = require
    .context("/content/pages", false, /\.\/.*\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  const paths = markdownFiles.map((path) => {
    return {
      params: {
        id: path.substring(0, path.length - 3),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  const blogpost = await import(`../../../../content/pages/${id}.md`).catch(
    () => null
  );

  return {
    props: {
      blogpost: blogpost.attributes,
    },
  };
};
