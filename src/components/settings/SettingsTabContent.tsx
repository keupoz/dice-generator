import type { FC, PropsWithChildren } from 'react'
import { TabsContent } from '~/shadcn/components/ui/tabs'

export interface SettingsTabContentProps {
  value: string
}

export const SettingsTabContent: FC<
  PropsWithChildren<SettingsTabContentProps>
> = ({ value, children }) => {
  return (
    <TabsContent value={value}>
      <div className="py-2 flex flex-col gap-2">{children}</div>
    </TabsContent>
  )
}
