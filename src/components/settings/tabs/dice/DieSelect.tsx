import { useAtomValue } from '@atomous/react'
import { Select } from '@mantine/core'
import { DICE, DIE_NAMES } from '~/dice/allDice'
import { focusObject } from '~/state/controls'
import { $currentDie, $currentDieFace } from '~/state/settings'

export function DieSelect() {
  const currentDie = useAtomValue($currentDie)

  function onChange(value: string | null) {
    if (value === null) return

    const die = DICE[value]
    $currentDie.set(die)
    $currentDieFace.set(die?.faces[0])
    focusObject(die?.$output.get())
  }

  return (
    <Select
      label="Die"
      value={currentDie?.name}
      data={DIE_NAMES}
      onChange={onChange}
    />
  )
}
