import type { PropsWithChildren } from 'react'
import { Stack, Tabs } from '@mantine/core'

export interface SettingsTabContentProps {
  value: string
}

export function SettingsTabContent({ value, children }: PropsWithChildren<SettingsTabContentProps>) {
  return (
    <Tabs.Panel value={value} pt="md">
      <Stack gap="md">
        {children}
      </Stack>
    </Tabs.Panel>
  )
}
