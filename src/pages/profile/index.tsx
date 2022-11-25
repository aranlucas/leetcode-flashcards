import { Button, Group, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form/text-input";
import Layout from "../../components/layout/layout";
import Header from "../../components/header";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

export default function NewPet() {
  const router = useRouter();
  const session = useSession();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      session: session.data?.user?.LEETCODE_SESSION,
      csrf: session.data?.user?.LEETCODE_CSRF,
    },
  });

  const mutation = trpc.auth.updateUser.useMutation();

  return (
    <Layout headerContent={<Header variant={1}>User Page</Header>}>
      <form
        onSubmit={handleSubmit(async (data) => {
          await mutation.mutateAsync({
            session: data.session ?? "",
            csrf: data.csrf ?? "",
          });
        })}
      >
        <Paper radius="md" p="md" withBorder>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <TextInput
            control={control}
            name="session"
            label="Leetcode Session"
            placeholder="Leetcode Session"
          />
          <TextInput
            control={control}
            name="csrf"
            label="CSRF"
            placeholder="Leetcode CSRF"
          />
        </Paper>
        <Group position="right" mt="md">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Layout>
  );
}
