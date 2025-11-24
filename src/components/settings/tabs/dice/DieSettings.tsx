import { useAtomValue } from '@atomous/react'
import { Button, Divider, Group, SimpleGrid, Text } from '@mantine/core'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { AtomSwitch } from '~/components/inputs/AtomSwitch'
import { $currentDie } from '~/state/settings'
import { exportSTL } from '~/utils/exporters/exportSTL'
import { DieFaceSelect } from './DieFaceSelect'
import { DieFaceSettings } from './DieFaceSettings'
import { DieInputs } from './DieInputs'
import { FocusButton } from './FocusButton'

export function DieSettings() {
  const die = useAtomValue($currentDie)

  if (!die) return <Text c="dimmed" ta="center">No die selected</Text>

  return (
    <>
      <SimpleGrid cols={2} spacing="xs">
        <Button onClick={() => exportSTL(die.$output, false, die.name)}>Export die</Button>
        <Button onClick={() => exportSTL(die.$output, true, die.name)}>Export blank</Button>
      </SimpleGrid>

      <Group gap="xs">
        <AtomSwitch atom={die.$visible} label="Visible" flex={1} />
        <FocusButton die={die} />
      </Group>

      <SimpleGrid cols={2} spacing="xs">
        <AtomSlider atom={die.$fontScale} label="Font scale" min={0.05} max={2} step={0.05} />
        <AtomSlider atom={die.$markScale} label="Mark scale" min={0.05} max={2} step={0.05} />
      </SimpleGrid>

      <AtomSlider atom={die.$svgScale} label="SVG scale" min={0.05} max={2} step={0.05} />

      <Divider />

      <DieInputs die={die} />

      <Divider />

      <DieFaceSelect faces={die.faces} />
      <DieFaceSettings />
    </>
  )
}
