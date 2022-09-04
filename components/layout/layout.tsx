import { ReactNode } from "react";
import { AppShell, Container, Group, Stack } from "@mantine/core";
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
    <AppShell padding="md" header={<HeaderAction />}>
      <Container>
        <Stack>
          <Group>{!disableBreadcrumbs && <Breadcrumbs />}</Group>
          {headerContent}
          {children}
        </Stack>
      </Container>
    </AppShell>
  );
}
