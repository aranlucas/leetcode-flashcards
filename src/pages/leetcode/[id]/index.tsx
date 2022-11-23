import { Prism } from "@mantine/prism";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";
import { getAllQuestionId, getQuestionData } from "../../../lib/leetcode";
// @ts-expect-error
import PrismRenderer from "prism-react-renderer/prism";

// @ts-expect-error
(typeof global !== "undefined" ? global : window).Prism = PrismRenderer;

require("prismjs/components/prism-java");

export default function Post({
  question,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Prism language={"java" as any}>{question.code}</Prism>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllQuestionId();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  const question = getQuestionData(id);

  return {
    props: {
      question,
    },
  };
};
