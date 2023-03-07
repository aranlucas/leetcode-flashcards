import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import NextLink from "next/link";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export function HeroText() {
  const { classes } = useStyles();

  return (
    <div>
      <Container size={700}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            fully featured
          </Text>{" "}
          Flashcard website for leetcode.
        </h1>

        <Text className={classes.description} color="dimmed">
          Master the fundamentals of computer science with our comprehensive
          course on data structures and algorithms. Sign up now and start
          learning with interactive lessons and hands-on exercises.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            component={NextLink}
            href="/leetcode"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Go to question bank
          </Button>
        </Group>
      </Container>
    </div>
  );
}
