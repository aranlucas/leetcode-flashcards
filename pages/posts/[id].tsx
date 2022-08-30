import { Title, TypographyStylesProvider } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params == null) {
    return {
      notFound: true,
    };
  }

  if (typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const postData = await getPostData(params.id);

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
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Title order={1}>{postData.title}</Title>
      {postData.date}
      <br />

      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </TypographyStylesProvider>
    </>
  );
}

Post.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};
