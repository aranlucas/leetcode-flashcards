import { Prism } from "@mantine/prism";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";
import { getAllQuestionId, getQuestionData } from "../../../lib/leetcode";
// @ts-expect-error
import PrismRenderer from "prism-react-renderer/prism";
import {
  Stack,
  TypographyStylesProvider,
  Footer,
  Flex,
  Button,
  Divider,
} from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";

// @ts-expect-error
(typeof global !== "undefined" ? global : window).Prism = PrismRenderer;

require("prismjs/components/prism-java");

export default function Post({
  question,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = trpc.leetcode.getSubmissions.useQuery({
    titleSlug: router.query.id as string,
  });

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const language = data?.lang || "java";
  const code = data?.code || question.code;

  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <Layout
      footer={
        <Footer height={60} p="md">
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button
              onClick={() => {
                setShowAnswer(true);
                scrollIntoView({ alignment: "start" });
              }}
            >
              Show answer
            </Button>
          </Flex>
        </Footer>
      }
    >
      <Stack>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: question.content }} />
        </TypographyStylesProvider>
        <Divider my="sm" />
        <div ref={targetRef}>
          {showAnswer && <Prism language={language}>{code}</Prism>}
        </div>
      </Stack>
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
