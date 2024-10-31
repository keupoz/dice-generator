import type { FC } from 'react'
import { Stack, Tabs } from '@mantine/core'
import { memo } from 'react'
import { DiceTab } from './tabs/DiceTab'
import { FilesTab } from './tabs/FilesTab'
import { FontsTab } from './tabs/FontsTab'
import { GlobalTab } from './tabs/GlobalTab'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Settings: FC = memo(() => {
  return (
    <Stack gap="sm" p="sm">
      <ThemeSwitcher />

      <Tabs defaultValue="global">
        <Tabs.List>
          <Tabs.Tab value="global">Global</Tabs.Tab>
          <Tabs.Tab value="fonts">Fonts</Tabs.Tab>
          <Tabs.Tab value="files">Files</Tabs.Tab>
          <Tabs.Tab value="dice">Dice</Tabs.Tab>
        </Tabs.List>

        <GlobalTab />
        <FontsTab />
        <FilesTab />
        <DiceTab />
      </Tabs>
    </Stack>
  )
})
