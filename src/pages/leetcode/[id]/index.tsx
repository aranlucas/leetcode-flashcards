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

  const gradesModel = [
    {
      label: "complete blackout.",
      message: "You suck! 🤥",
    },
    {
      label: "incorrect response; the correct one remembered.",
      message: "You suck less. 🤥",
    },
    {
      label: "incorrect response; where the correct one seemed easy to recall.",
      message: "You suck lesser. 🤥",
    },
    {
      label: "correct response recalled with serious difficulty.",
      message: "Meh. 😕",
    },
    {
      label: "correct response after a hesitation.",
      message: "You dont suck. 😐",
    },
    {
      label: "perfect response.",
      message: "Well done! 🥳",
    },
  ];

  const grades = gradesModel.map(({ label, message }, idx) => {
    return (
      <Tooltip label={label} key={idx}>
        <Button
          onClick={() => {
            mutation.mutate({ grade: idx, problemId: id });
            showNotification({
              title: "Review Submitted",
              message,
            });
          }}
        >
          {idx}
        </Button>
      </Tooltip>
    );
  });

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
            {state.value === "review" && <>{grades}</>}
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
