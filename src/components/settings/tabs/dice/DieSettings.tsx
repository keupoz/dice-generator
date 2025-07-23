import { Button, Divider, SimpleGrid, Text } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { AtomSwitch } from '~/components/inputs/AtomSwitch'
import { focusObject } from '~/state/controls'
import { $currentDie } from '~/state/settings'
import { exportSTL } from '~/utils/exporters/exportSTL'
import { DieFaceSelect } from './DieFaceSelect'
import { DieFaceSettings } from './DieFaceSettings'
import { DieInputs } from './DieInputs'

export function DieSettings() {
  const die = useAtom($currentDie)

  if (!die) return <Text c="dimmed" ta="center">No die selected</Text>

  return (
    <>
      <SimpleGrid cols={2} spacing="xs">
        <Button onClick={() => focusObject(die.$output.get())}>Focus</Button>
        <Button onClick={() => exportSTL(die.$output, die.name)}>Export STL</Button>
      </SimpleGrid>

      <AtomSwitch atom={die.$visible} label="Visible" />
      <AtomSlider atom={die.$fontScale} label="Font scale" min={0.05} max={2} step={0.05} />
      <AtomSlider atom={die.$svgScale} label="SVG scale" min={0.05} max={2} step={0.05} />

      <Divider />

      <DieInputs die={die} />

      <Divider />

      <DieFaceSelect faces={die.faces} />
      <DieFaceSettings />
    </>
  )
}
