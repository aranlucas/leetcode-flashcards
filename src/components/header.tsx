import { Group, Title, TitleOrder, Text, Stack } from "@mantine/core";
import { ReactNode } from "react";

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
    <Stack spacing="xs">
      <Group position="apart">
        <Group spacing="xs">
          <Title order={variant}>{children}</Title>
          {counter && (
            <Title order={variant} color="dimmed" weight={500}>
              {counter}
            </Title>
          )}
        </Group>
        {actions}
      </Group>
      {description && (
        <Text size="sm" color="dimmed">
          {description}
        </Text>
      )}
    </Stack>
  );
}
