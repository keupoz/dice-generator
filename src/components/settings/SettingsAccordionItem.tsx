import type { FC, PropsWithChildren } from 'react'
import { Accordion, Stack } from '@mantine/core'

export interface SettingsAccordionItemProps {
  name: string
}

export const SettingsAccordionItem: FC<
  PropsWithChildren<SettingsAccordionItemProps>
> = ({ name, children }) => {
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
