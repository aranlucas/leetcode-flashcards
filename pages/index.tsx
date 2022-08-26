import { Card, Group, Text } from "@mantine/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../components/layout";
import { getSortedPostsData, Post } from "../lib/posts";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function IndexPage() {
  return <Layout>Sample website</Layout>;
}
