"use client";

import { Container, Group } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";
import SignIn from "./sign-in";
import classes from "./header.module.css";

export function HeaderAction() {
  return (
    <Container className={classes.inner} fluid>
      <Group>
        <IconRocket size={28} />
      </Group>
      <Group>
        <SignIn />
      </Group>
    </Container>
  );
}
