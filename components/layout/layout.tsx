import { ReactNode } from "react";
import { AppShell, Stack } from "@mantine/core";
import { HeaderAction } from "./header";
import Breadcrumbs from "../breadcrumbs";

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  disableBreadcrumbs?: boolean;
}

export default function Layout({
  children,
  headerContent,
  disableBreadcrumbs,
}: LayoutProps) {
  return (
    <AppShell
      padding="md"
      header={
        <HeaderAction
          links={[
            {
              link: "/pets",
              label: "Pets",
            },
          ]}
        />
      }
    >
      <Stack px="xl">
        {!disableBreadcrumbs && <Breadcrumbs />}
        {headerContent}
        {children}
      </Stack>
    </AppShell>
  );
}
