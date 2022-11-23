import { Prism } from "@mantine/prism";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";
import { getAllQuestionId, getQuestionData } from "../../../lib/leetcode";
// @ts-expect-error
import PrismRenderer from "prism-react-renderer/prism";
import { createStyles, Stack, TypographyStylesProvider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

// @ts-expect-error
(typeof global !== "undefined" ? global : window).Prism = PrismRenderer;

require("prismjs/components/prism-java");

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

export default function Post({
  question,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes } = useStyles();

  return (
    <Layout>
      <Stack>
        <Carousel
          loop
          controlsOffset="xs"
          sx={{ flex: 1 }}
          classNames={classes}
        >
          <Carousel.Slide>
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: question.content }} />
            </TypographyStylesProvider>
          </Carousel.Slide>
          <Carousel.Slide>
            <Prism language={"java" as any}>{question.code}</Prism>
          </Carousel.Slide>
        </Carousel>
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
