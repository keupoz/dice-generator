import type { DieResult } from '~/dice/utils/createDie'
import { Button, Divider, SimpleGrid } from '@mantine/core'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { AtomSwitch } from '~/components/inputs/AtomSwitch'
import { focusObject } from '~/state/controls'
import { exportSTL } from '~/utils/exporters/exportSTL'
import { DieFacesSettings } from './DieFacesSettings'
import { DieInputs } from './DieInputs'

export interface DieSettingsProps {
  die: DieResult
}

export function DieSettings({ die }: DieSettingsProps) {
  return (
    <>
      <SimpleGrid cols={2} spacing="xs">
        <Button onClick={() => focusObject(die.$output.get())}>Focus</Button>
        <Button onClick={() => exportSTL(die.$output, die.name)}>Export STL</Button>
      </SimpleGrid>

      <AtomSwitch atom={die.$visible} label="Visible" />
      <AtomSlider atom={die.$fontScale} label="Font scale" min={0.05} max={2} step={0.05} />

      <Divider />

      <DieInputs die={die} />

      <Divider />

      <DieFacesSettings faces={die.faces} />
    </>
  )
}
