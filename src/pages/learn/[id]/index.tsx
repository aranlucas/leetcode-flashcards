import { TypographyStylesProvider } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";

export default function IndexPage({
  blogpost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: blogpost }} />
      </TypographyStylesProvider>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownFiles = require
    .context("/content/learn", false, /\.\/.*\.md$/)
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

  const blogpost = await import(`../../../../content/learn/${id}.md`).catch(
    () => null
  );

  return {
    props: {
      blogpost: blogpost.html,
    },
  };
};
