import {
  AppShell,
  Tooltip,
  UnstyledButton,
  Stack,
} from "@mantine/core";
import { IconHome2, IconMovie, IconInbox } from "@tabler/icons-react";
import Link from "next/link";
import classes from "./navbar.module.css";

const mockdata = [
  { icon: IconHome2, label: "Home", href: "/" },
  { icon: IconMovie, label: "Movies", href: "/movies" },
  { icon: IconInbox, label: "Posts", href: "/posts" },
];

// eslint-disable-next-line react/display-name
mockdata.forEach((item) => (item.icon.displayName = item.label));

export function NavbarMinimal() {
  const links = mockdata.map((link) => (
    <Tooltip label={link.label} position="right" key={link.label}>
      <Link href={link.href} passHref legacyBehavior>
        <UnstyledButton component="a" className={classes.link}>
          <link.icon stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  ));

  return (
    <AppShell.Navbar>
      <Stack justify="center" gap={0}>
        {links}
      </Stack>
    </AppShell.Navbar>
  );
}
