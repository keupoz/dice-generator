import type { PropsWithChildren } from 'react'
import { Button, Collapse } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export interface CollapseButtonProps {
  label: string
}

export function CollapseButton({ label, children }: PropsWithChildren<CollapseButtonProps>) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <>
      <Button variant="default" onClick={toggle}>{label}</Button>

      <Collapse in={opened}>
        {children}
      </Collapse>
    </>
  )
}
