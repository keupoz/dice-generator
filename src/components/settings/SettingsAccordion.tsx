import type { FC, PropsWithChildren } from 'react'
import { Accordion } from '@mantine/core'

export const SettingsAccordion: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Accordion>
      {children}
    </Accordion>
  )
}
