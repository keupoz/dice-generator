import type { PropsWithChildren } from 'react'
import { Accordion, Stack } from '@mantine/core'

export interface SettingsAccordionItemProps {
  name: string
}

export function SettingsAccordionItem({ name, children }: PropsWithChildren<SettingsAccordionItemProps>) {
  return (
    <Accordion.Item value={name}>
      <Accordion.Control>{name}</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          {children}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
