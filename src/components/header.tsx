import { Group, Title, type TitleOrder, Text, Stack } from "@mantine/core";
import { type ReactNode } from "react";

interface HeaderProps {
  actions?: ReactNode;
  variant: TitleOrder;
  children: ReactNode;
  counter?: ReactNode;
  description?: ReactNode;
}

export default function Header({
  variant,
  children,
  actions,
  description,
  counter,
}: HeaderProps) {
  return (
    <Stack gap="xs">
      <Group justify="apart">
        <Group gap="xs">
          <Title order={variant}>{children}</Title>
          {counter && (
            <Title order={variant} c="dimmed" fw={500}>
              {counter}
            </Title>
          )}
        </Group>
        {actions}
      </Group>
      {description && (
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      )}
    </Stack>
  );
}
