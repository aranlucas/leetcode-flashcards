import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout/layout";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { join } from "path";
import fs from "fs";
import { Code, Title } from "@mantine/core";
import { ComponentProps } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Prism } from "@mantine/prism";

const components: ComponentProps<typeof MDXProvider>["components"] = {
  h1: (props: any) => <Title order={1} {...props} />,
  h2: (props: any) => <Title order={2} {...props} />,
  h3: (props: any) => <Title order={3} {...props} />,
  h4: (props: any) => <Title order={4} {...props} />,
  h5: (props: any) => <Title order={5} {...props} />,
  h6: (props: any) => <Title order={6} {...props} />,
  ul: (props: any) => (
    <ul
      {...props}
      style={{ lineHeight: 1.65, marginBottom: 20, marginTop: 10 }}
    />
  ),
  li: (props: any) => <li {...props} style={{ marginTop: 4 }} />,
  code: (props: any) => <Code {...props} />,
  pre: (props: any) => {
    const matches =
      props.children.props.className.match(/language-(?<lang>.*)/);

    const language = matches?.groups?.lang ? matches.groups.lang : "";

    return (
      <Prism language={language} mb={20}>
        {props.children.props?.children}
      </Prism>
    );
  },
};

export default function IndexPage({
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <MDXRemote {...mdxSource} components={components} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentDirectory = join(process.cwd(), "content/learn");

  const postFilePaths = fs
    .readdirSync(contentDirectory)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));

  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const contentDirectory = join(process.cwd(), "content/learn");

  const fullPath = join(contentDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const mdxSource = await serialize(fileContents, {
    parseFrontmatter: true,
  });

  return {
    props: {
      mdxSource,
    },
  };
};
