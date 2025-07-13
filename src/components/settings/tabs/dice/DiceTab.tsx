import { Select, Text } from '@mantine/core'
import { useState } from 'react'
import { DICE, DICE_SORTED, DIE_NAMES } from '~/dice/allDice'
import { DieSettings } from './DieSettings'

export function DiceTab() {
  const [currentDieName, setCurrentDieName] = useState(DICE_SORTED[0]?.name)
  const currentDie = currentDieName ? DICE[currentDieName] : undefined

  function onChange(value: string | null) {
    if (value === null) return
    setCurrentDieName(value)
  }

  return (
    <>
      <Select
        label="Die"
        value={currentDie?.name}
        data={DIE_NAMES}
        onChange={onChange}
      />

      {currentDie
        ? <DieSettings key={currentDie.name} die={currentDie} />
        : <Text c="dimmed" ta="center">No die selected</Text>}
    </>
  )
}
