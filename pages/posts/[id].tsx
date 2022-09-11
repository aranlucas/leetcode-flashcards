import { Title, TypographyStylesProvider } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Layout from "../../components/layout/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  const postData = await getPostData(id);

  return {
    props: {
      postData,
    },
  };
};

export default function Post({
  postData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Title order={1}>{postData.title}</Title>
      {postData.date}

      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </TypographyStylesProvider>
    </Layout>
  );
}
