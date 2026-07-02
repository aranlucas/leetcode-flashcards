"use client";

import { type ReactElement, type ReactNode } from "react";
import { AppShell, Container, Group, Stack } from "@mantine/core";
import { HeaderAction } from "./header";
import Breadcrumbs from "../breadcrumbs";

const HEADER_HEIGHT = 40;

interface LayoutProps {
  children: ReactNode;
  headerContent?: ReactNode;
  disableBreadcrumbs?: boolean;
  footer?: ReactElement;
}

export default function Layout({
  children,
  headerContent,
  disableBreadcrumbs,
  footer,
}: LayoutProps) {
  return (
    <AppShell
      padding="md"
      header={{ height: HEADER_HEIGHT }}
      footer={footer ? { height: 60 } : undefined}
    >
      <AppShell.Header>
        <HeaderAction />
      </AppShell.Header>
      <AppShell.Main>
        <Container>
          <Stack>
            <Group>{!disableBreadcrumbs && <Breadcrumbs />}</Group>
            {headerContent}
            {children}
          </Stack>
        </Container>
      </AppShell.Main>
      {footer && <AppShell.Footer p="md">{footer}</AppShell.Footer>}
    </AppShell>
  );
}
