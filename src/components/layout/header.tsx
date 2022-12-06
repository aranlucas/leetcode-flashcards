import { createStyles, Header, Container, Group } from "@mantine/core";
import { IconRocket } from "@tabler/icons";
import SignIn from "./sign-in";

const HEADER_HEIGHT = 40;

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: 0,
  },
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export function HeaderAction() {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.header} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <IconRocket size={28} />
        </Group>

        <Group>
          <SignIn />
        </Group>
      </Container>
    </Header>
  );
}
