import { Select } from '@mantine/core'
import { useState } from 'react'
import { DICE, DIE_NAMES } from '~/dice/allDice'
import { DieSettings } from '../partials/DieSettings'
import { SettingsTabContent } from '../SettingsTabContent'

export function DiceTab() {
  const [currentDie, setCurrentDie] = useState(() => DICE[0])

  function selectDie(name: string | null) {
    if (!name) {
      return
    }

    const info = DICE.find(info => info.config.name === name)

    setCurrentDie(info)
  }

  return (
    <SettingsTabContent value="dice">
      <Select
        label="Die"
        data={DIE_NAMES}
        value={currentDie?.config.name ?? ''}
        placeholder="Select a die"
        onChange={selectDie}
      />

      {currentDie && <DieSettings key={currentDie.config.name} info={currentDie} />}
    </SettingsTabContent>
  )
}
