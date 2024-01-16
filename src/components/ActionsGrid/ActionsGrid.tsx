import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  useMantineTheme,
  MantineTheme,
} from '@mantine/core';
import { Icon } from '@tabler/icons-react';
import classes from './ActionsGrid.module.css';

export type ActionsGridData = {
  title: string;
  icon: Icon;
  color?: keyof MantineTheme['colors'];
  onClick: () => void;
}[];

const ActionsGrid: React.FC<{ title: string; data: ActionsGridData }> = ({ title, data }) => {
  const theme = useMantineTheme();

  const items = data.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} onClick={item.onClick}>
      <item.icon color={theme.colors[item.color ?? 'gray'][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>{title}</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
};

export default ActionsGrid;
