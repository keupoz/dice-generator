import { AppShell, Burger, Group, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Scene } from './Scene'
import { Settings } from './settings/Settings'

// This magically enables memoization
const AppContent = (
  <>
    <AppShell.Aside>
      <ScrollArea>
        <Settings />
      </ScrollArea>
    </AppShell.Aside>

    <AppShell.Main h="100dvh">
      <Scene />
    </AppShell.Main>
  </>
)

export function App() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 56 }}
      aside={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Text span fw={700} size="xl">Dice Generator</Text>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      {AppContent}
    </AppShell>
  )
}
