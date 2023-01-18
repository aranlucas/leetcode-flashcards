import { Prism } from "@mantine/prism";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";
// @ts-expect-error prism errors
import PrismRenderer from "prism-react-renderer/prism";
import { Stack, Footer, Flex, Button, Divider, Tooltip } from "@mantine/core";
import { trpc } from "../../../utils/trpc";
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { showNotification } from "@mantine/notifications";
import fs from "fs";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MantineMDX } from "../../../components/mdxprovider/mdxprovider";

// @ts-expect-error prism errors
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
  mdxSource,
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
        </Footer>
      }
    >
      <Stack>
        <MantineMDX {...mdxSource} />

        <Divider my="sm" />
        <div ref={targetRef}>
          {state.value === "review" && (
            <Prism language={language}>{data?.code || ""}</Prism>
          )}
        </div>
      </Stack>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDirectory = join(process.cwd(), "content/questions");

  const postFilePaths = fs.readdirSync(contentDirectory);

  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  mdxSource: MDXRemoteSerializeResult;
}> = async ({ params }) => {
  const id = params?.id as string;
  const contentDirectory = join(process.cwd(), "content/questions");

  const fullPath = join(contentDirectory, `${id}/question.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const mdxSource = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: { format: "md" },
  });

  return {
    props: {
      mdxSource,
    },
  };
};
