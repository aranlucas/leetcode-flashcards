"use client";

import { CodeHighlight } from "@mantine/code-highlight";
import { Stack, Flex, Button, Divider, Tooltip } from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import { useScrollIntoView } from "@mantine/hooks";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { notifications } from "@mantine/notifications";
import { MantineMDX } from "../../../components/mdxprovider/mdxprovider";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import Layout from "../../../components/layout/layout";

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

interface LeetcodeDetailProps {
  id: string;
  mdxSource: MDXRemoteSerializeResult;
}

export default function LeetcodeDetail({
  id,
  mdxSource,
}: LeetcodeDetailProps) {
  const { data } = trpc.leetcode.getSubmissions.useQuery({
    titleSlug: id,
  });

  const mutation = trpc.leetcode.updateReview.useMutation();

  const [state, send] = useMachine(reviewMachine);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  const gradesModel = [
    { label: "complete blackout.", message: "You suck!" },
    {
      label: "incorrect response; the correct one remembered.",
      message: "You suck less.",
    },
    {
      label: "incorrect response; where the correct one seemed easy to recall.",
      message: "You suck lesser.",
    },
    {
      label: "correct response recalled with serious difficulty.",
      message: "Meh.",
    },
    {
      label: "correct response after a hesitation.",
      message: "You dont suck.",
    },
    { label: "perfect response.", message: "Well done!" },
  ];

  const grades = gradesModel.map(({ label, message }, idx) => (
    <Tooltip label={label} key={idx}>
      <Button
        onClick={() => {
          mutation.mutate({ grade: idx, problemId: id });
          notifications.show({
            title: "Review Submitted",
            message,
          });
        }}
      >
        {idx}
      </Button>
    </Tooltip>
  ));

  return (
    <Layout
      footer={
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {state.value === "problem" && (
            <Button
              onClick={() => {
                scrollIntoView({ alignment: "start" });
                send("REVIEW");
              }}
            >
              Show answer
            </Button>
          )}
          {state.value === "review" && <>{grades}</>}
        </Flex>
      }
    >
      <Stack>
        <MantineMDX {...mdxSource} />
        <Divider my="sm" />
        <div ref={targetRef}>
          {state.value === "review" && data?.code && (
            <CodeHighlight code={data.code} language={data.lang || "java"} />
          )}
        </div>
      </Stack>
    </Layout>
  );
}
