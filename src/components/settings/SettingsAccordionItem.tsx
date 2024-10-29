import type { FC, PropsWithChildren } from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/shadcn/components/ui/accordion'

export interface SettingsAccordionItemProps {
  name: string
}

export const SettingsAccordionItem: FC<
  PropsWithChildren<SettingsAccordionItemProps>
> = ({ name, children }) => {
  return (
    <AccordionItem value={name} className="last:border-b-0">
      <AccordionTrigger className="h-8">{name}</AccordionTrigger>
      <AccordionContent className="py-2 border-t flex flex-col gap-2">
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}
