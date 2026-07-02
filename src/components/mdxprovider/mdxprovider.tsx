import { Code, Title } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote";

const components: MDXRemoteProps["components"] = {
  h1: (props: any) => <Title order={1} {...props} />,
  h2: (props: any) => <Title order={2} {...props} />,
  h3: (props: any) => <Title order={3} {...props} />,
  h4: (props: any) => <Title order={4} {...props} />,
  h5: (props: any) => <Title order={5} {...props} />,
  h6: (props: any) => <Title order={6} {...props} />,
  p: (props: any) => <p {...props} style={{ lineHeight: 1.55 }} />,
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
      <CodeHighlight code={props.children.props?.children} language={language} mb={20} />
    );
  },
};

export function MantineMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={components} />;
}
