import { Card, Group, Text } from "@mantine/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../components/layout/layout";
import { getSortedPostsData, Post } from "../../lib/posts";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function IndexPage({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Group mt={50} position="center">
        {allPostsData.map(({ id, title }: Post) => (
          <Card
            component="a"
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            key={id}
            href={`/posts/${id}`}
          >
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{title}</Text>
            </Group>
          </Card>
        ))}
      </Group>
    </Layout>
  );
}
