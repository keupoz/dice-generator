import { Select } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useDiceRegistryStore } from '~/components/dice/utils/registry'
import { DieSettings } from '../partials/DieSettings'
import { SettingsTabContent } from '../SettingsTabContent'

export function DiceTab() {
  const dice = useDiceRegistryStore(state => state.dice)

  const [currentDie, setCurrentDie] = useState(() => dice[0])

  const options = useMemo(() => {
    return dice.map(info => info.config.name)
  }, [dice])

  function selectDie(name: string | null) {
    if (!name) {
      return
    }

    const info = dice.find(info => info.config.name === name)

    setCurrentDie(info)
  }

  return (
    <SettingsTabContent value="dice">
      <Select
        label="Die"
        data={options}
        value={currentDie?.config.name ?? ''}
        placeholder="Select a die"
        onChange={selectDie}
      />

      {currentDie && <DieSettings key={currentDie.config.name} info={currentDie} />}
    </SettingsTabContent>
  )
}
