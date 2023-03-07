import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import { IconHome2, IconMovie, IconInbox } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const mockdata = [
  { icon: IconHome2, label: "Home", href: "/" },
  { icon: IconMovie, label: "Movies", href: "/movies" },
  { icon: IconInbox, label: "Posts", href: "/posts" },
];

export function NavbarMinimal() {
  const router = useRouter();
  const links = mockdata.map((link, index) => (
    <Tooltip label={link.label} position="right" key={link.label}>
      <Link href={link.href} passHref>
        <UnstyledButton
          component="a"
          className={cx(classes.link, {
            [classes.active]: router.pathname === link.href,
          })}
        >
          <link.icon stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  ));
  const { classes, cx } = useStyles();

  return (
    <Navbar>
      <Navbar.Section grow>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
