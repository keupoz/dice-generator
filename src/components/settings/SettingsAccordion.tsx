import type { FC, PropsWithChildren } from 'react'
import { Accordion } from '~/shadcn/components/ui/accordion'

export const SettingsAccordion: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {children}
    </Accordion>
  )
}
