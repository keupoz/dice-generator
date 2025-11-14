import type { DieResult } from '~/dice/utils/createDie'
import { useAtomValue } from '@atomous/react'
import { Button } from '@mantine/core'
import { focusObject } from '~/state/controls'

export interface FocusButtonProps {
  die: DieResult
}

export function FocusButton({ die }: FocusButtonProps) {
  const disabled = !useAtomValue(die.$visible)

  return <Button disabled={disabled} onClick={() => focusObject(die.$output.get())}>Focus</Button>
}
