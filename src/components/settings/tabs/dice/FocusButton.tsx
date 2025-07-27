import type { DieResult } from '~/dice/utils/createDie'
import { Button } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'
import { focusObject } from '~/state/controls'

export interface FocusButtonProps {
  die: DieResult
}

export function FocusButton({ die }: FocusButtonProps) {
  const disabled = !useAtom(die.$visible)

  return <Button disabled={disabled} onClick={() => focusObject(die.$output.get())}>Focus</Button>
}
