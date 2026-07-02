"use client";

import { Container, Text, Button, Group } from "@mantine/core";
import NextLink from "next/link";
import classes from "./hero.module.css";

export function HeroText() {
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
        <Text className={classes.description} c="dimmed">
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
