import { Button, Group } from "@mantine/core";
import Link from "next/link";
import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function IndexPage({
  allPostsData,
}: {
  allPostsData: { id: string; date: string; title: string }[];
}) {
  return (
    <Layout>
      <Group mt={50} position="center">
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
        <Button size="xl">Welcome to Mantine!</Button>
        <Link href="/posts/first-post" passHref>
          <Button component="a">Next link button</Button>
        </Link>
      </Group>
    </Layout>
  );
}
