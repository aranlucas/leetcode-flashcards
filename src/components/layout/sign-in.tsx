import { Button, Avatar, Text, Menu, Group } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconLogout, IconSettings } from "@tabler/icons";
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
    <Group position="center">
      <Menu withArrow width={300} position="bottom" transition="pop">
        <Menu.Target>
          <Avatar src={session.user?.image} alt="it's me" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Group>
              <Avatar radius="xl" src={session.user?.image} />

              <div>
                <Text weight={500}>{session.user?.name}</Text>
                <Text size="xs" color="dimmed">
                  {session.user?.email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
            <NextLink legacyBehavior href="/profile">
              Account settings
            </NextLink>
          </Menu.Item>
          <Menu.Item
            onClick={async () => {
              await signOut();
            }}
            icon={<IconLogout size={14} stroke={1.5} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
