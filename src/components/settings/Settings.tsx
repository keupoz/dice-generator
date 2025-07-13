import type { ReactNode } from 'react'
import { Stack, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core'
import { DiceTab } from './tabs/dice/DiceTab'
import { FilesTab } from './tabs/files/FilesTab'
import { FontsTab } from './tabs/fonts/FontsTab'
import { GeneralTab } from './tabs/general/GeneralTab'

interface Tab {
  value: string
  label: ReactNode
  content: ReactNode
}

const TABS: Tab[] = [
  { value: 'general', label: 'General', content: <GeneralTab /> },
  { value: 'fonts', label: 'Fonts', content: <FontsTab /> },
  { value: 'dice', label: 'Dice', content: <DiceTab /> },
  { value: 'files', label: 'Files', content: <FilesTab /> },
]

export function Settings() {
  return (
    <Tabs defaultValue={TABS[0]?.value}>
      <TabsList grow>
        {TABS.map(tab => <TabsTab key={tab.value} value={tab.value}>{tab.label}</TabsTab>)}
      </TabsList>

      {TABS.map(tab => (
        <TabsPanel key={tab.value} value={tab.value}>
          <Stack gap="sm" p="sm">
            {tab.content}
          </Stack>
        </TabsPanel>
      ))}
    </Tabs>
  )
}
