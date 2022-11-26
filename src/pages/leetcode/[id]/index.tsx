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
  Tooltip,
} from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { openModal, closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

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
  const id = router.query.id as string;
  const { data } = trpc.leetcode.getSubmissions.useQuery({
    titleSlug: id,
  });

  const mutation = trpc.leetcode.updateReview.useMutation();

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
                <Tooltip label="complete blackout.">
                  <Button onClick={() => {
                    mutation.mutateAsync({grade: 0, problemId: id});
                    showNotification({
                      title: 'Review Submitted',
                      message: 'You suck. 🤥'
                    });
                  }}>0</Button>
                </Tooltip>
                <Tooltip label="incorrect response; the correct one remembered.">
                  <Button onClick={() => {
                    mutation.mutateAsync({grade: 1, problemId: id});
                    showNotification({
                      title: 'Review Submitted',
                      message: 'You suck less. 🤥'
                    });
                  }}>1</Button>
                </Tooltip>
                <Tooltip label="incorrect response; where the correct one seemed easy to recall.">
                  <Button onClick={() => {
                    mutation.mutateAsync({grade: 2, problemId: id});
                    showNotification({
                      title: 'Review Submitted',
                      message: 'You suck lesser. 🤥'
                    });
                  }}>2</Button>
                </Tooltip>
                <Tooltip label="correct response recalled with serious difficulty.">
                  <Button onClick={() => {
                    mutation.mutateAsync({grade: 3, problemId: id});
                    showNotification({
                      title: 'Review Submitted',
                      message: 'Meh. 😕'
                    });
                  }}>3</Button>
                </Tooltip>
                <Tooltip label="correct response after a hesitation.">
                  <Button onClick={() => {
                      mutation.mutateAsync({grade: 4, problemId: id})
                      showNotification({
                        title: 'Review Submitted',
                        message: 'You dont suck. 😐'
                      });
                  }}>4</Button>
                </Tooltip>
                <Tooltip label="perfect response.">
                  <Button onClick={() => {
                      mutation.mutateAsync({grade: 5, problemId: id})
                      showNotification({
                        title: 'Review Submitted',
                        message: 'Well done! 🥳'
                      })
                  }}>5</Button>
                </Tooltip>
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
