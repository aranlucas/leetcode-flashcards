import { ReactNode } from "react";
import { AppShell, Group, Header } from "@mantine/core";
import { NavbarMinimal } from "./navbar";
import { IconRocket } from "@tabler/icons";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarMinimal />}
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <IconRocket />
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
