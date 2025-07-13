import type { PropsWithChildren } from 'react'
import { AppShellHeader, Burger, Group, AppShell as MantineAppShell, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { $pending } from '~/atoms/effect'
import { AtomLoader } from './AtomLoader'

export function AppShell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <MantineAppShell
      header={{ height: 56 }}
      aside={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShellHeader px="md">
        <Group h="100%" justify="space-between">
          <Group>
            <Text span fw={700} size="xl">Dice Generator</Text>
            <AtomLoader atom={$pending} />
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShellHeader>

      {children}
    </MantineAppShell>
  )
}
