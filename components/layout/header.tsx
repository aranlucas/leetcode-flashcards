import {
  createStyles,
  Header,
  Container,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { IconRocket } from "@tabler/icons";
import Link from "next/link";
import SignIn from "./sign-in";

const HEADER_HEIGHT = 50;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface HeaderActionProps {
  links: Array<{
    link: string;
    label: string;
    links?: Array<{ link: string; label: string }>;
  }>;
}

export function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const items = links.map((link) => {
    return (
      <Link href={link.link} passHref className={classes.link} key={link.label}>
        <UnstyledButton component="a">{link.label}</UnstyledButton>
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <IconRocket size={28} />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <SignIn />
      </Container>
    </Header>
  );
}
