import { ReactNode } from "react";
import { AppShell, Group, Header } from "@mantine/core";
import Image from "next/image";
import { NavbarMinimal } from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const name = "Lucas";
  return (
    <AppShell
      padding="md"
      navbar={<NavbarMinimal />}
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Image
              priority
              src="/images/profile.jpg"
              height={30}
              width={30}
              alt={name}
            />
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
