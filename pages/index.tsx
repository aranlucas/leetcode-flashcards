import { GetStaticProps } from "next";
import { ReactNode } from "react";
import { HeroText } from "../components/hero";
import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function IndexPage() {
  return <HeroText />;
}

IndexPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};
