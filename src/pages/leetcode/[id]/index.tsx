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
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { openModal, closeAllModals } from "@mantine/modals";
import RichText from "../../../components/RichText";

// @ts-expect-error
(typeof global !== "undefined" ? global : window).Prism = PrismRenderer;

require("prismjs/components/prism-java");

const reviewMachine = createMachine({
  predictableActionArguments: true,
  id: "review",
  initial: "problem",
  states: {
    problem: {
      on: { REVIEW: "review" },
    },
    review: {},
  },
});

export default function Post({
  question,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = trpc.leetcode.getSubmissions.useQuery({
    titleSlug: router.query.id as string,
  });
  const { data: note } = trpc.leetcode.getNote.useQuery({
    titleSlug: router.query.id as string,
  });
  const [state, send] = useMachine(reviewMachine);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const language = data?.lang || "java";
  const code = data?.code || question.code;

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
            {state.value === "problem" && (
              <>
                <Button
                  onClick={() => {
                    scrollIntoView({ alignment: "start" });
                    send("REVIEW");
                  }}
                >
                  Show answer
                </Button>
                <Button
                  onClick={() => {
                    openModal({
                      children: (
                        <>
                          <RichText readOnly id="rte" value={note.note || ""} />
                          <Button
                            fullWidth
                            onClick={() => {
                              closeAllModals();
                            }}
                            mt="md"
                          >
                            Submit
                          </Button>
                        </>
                      ),
                    });
                  }}
                >
                  Show Notes
                </Button>
              </>
            )}
            {state.value === "review" && (
              <>
                <Button onClick={() => {}}>Again</Button>
                <Button onClick={() => {}}>Hard</Button>
                <Button onClick={() => {}}>Good</Button>
                <Button onClick={() => {}}>Easy</Button>
              </>
            )}
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
          {state.value === "review" && (
            <Prism language={language}>{code}</Prism>
          )}
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
