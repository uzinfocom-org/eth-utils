import { AppShell, Box, Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import Navbar from '../Navbar';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Box display="flex" h="100%" py="md" px="lg" fw="bolder">
          <Text fz="lg">@uzinfocom/eth-utils</Text>
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;
