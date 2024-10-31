import type { FC, PropsWithChildren } from 'react'
import { Stack, Tabs } from '@mantine/core'

export interface SettingsTabContentProps {
  value: string
}

export const SettingsTabContent: FC<
  PropsWithChildren<SettingsTabContentProps>
> = ({ value, children }) => {
  return (
    <Tabs.Panel value={value} pt="md">
      <Stack gap="md">
        {children}
      </Stack>
    </Tabs.Panel>
  )
}
