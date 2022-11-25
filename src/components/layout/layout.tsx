import { ReactNode } from "react";
import { AppShell, Container, Group, Stack } from "@mantine/core";
import { HeaderAction } from "./header";
import Breadcrumbs from "../breadcrumbs";

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  disableBreadcrumbs?: boolean;
  footer?: ReactNode;
}

export default function Layout({
  children,
  headerContent,
  disableBreadcrumbs,
  footer,
}: LayoutProps) {
  return (
    <AppShell padding="md" header={<HeaderAction />} footer={footer}>
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
