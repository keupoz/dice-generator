import type { PropsWithChildren } from 'react'
import { Accordion } from '@mantine/core'

export function SettingsAccordion({ children }: PropsWithChildren) {
  return (
    <Accordion>
      {children}
    </Accordion>
  )
}
