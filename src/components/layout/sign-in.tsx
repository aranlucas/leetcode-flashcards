import { Button, Avatar, Popover, Text } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <Button onClick={async () => await signIn()} sx={{ height: 30 }}>
        Sign in
      </Button>
    );
  }

  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Avatar src={session.user?.image} alt="it's me" />
      </Popover.Target>
      <Popover.Dropdown>
        <Text>Hello {session.user?.name}</Text>
        <Button onClick={async () => await signOut()}>Sign out</Button>
      </Popover.Dropdown>
    </Popover>
  );
}
