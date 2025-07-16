import { Select } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'
import { DICE, DIE_NAMES } from '~/dice/allDice'
import { focusObject } from '~/state/controls'
import { $currentDie, $currentDieFace } from '~/state/settings'

export function DieSelect() {
  const currentDie = useAtom($currentDie)

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
