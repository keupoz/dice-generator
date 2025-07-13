import type { ComboboxData } from '@mantine/core'
import { Button, Divider, SimpleGrid } from '@mantine/core'
import { AtomSelect } from '~/components/inputs/AtomSelect'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { AtomSwitch } from '~/components/inputs/AtomSwitch'
import { $diceOutput } from '~/dice/allDice'
import { $enableAlign, $enableRender, $renderEngine, $renderOperation, RenderEngine, RenderOperation } from '~/state/render'
import { $baseOpacity, $enableWireframe, $showGrid, $smoothCamera } from '~/state/viewport'
import { exportSTL } from '~/utils/exporters/exportSTL'
import { ThemeSwitcher } from './ThemeSwitcher'

const renderEngines: ComboboxData = Object.entries(RenderEngine).map(([label, value]) => ({ label, value }))
const renderOperations: ComboboxData = Object.entries(RenderOperation).map(([label, value]) => ({ label, value }))

export function GeneralTab() {
  return (
    <>
      <ThemeSwitcher />

      <AtomSwitch atom={$showGrid} label="Show grid" />
      <AtomSwitch atom={$smoothCamera} label="Smooth camera" />
      <AtomSwitch atom={$enableWireframe} label="Enable wireframe" />
      <AtomSlider atom={$baseOpacity} label="Base opacity" min={0.1} max={1} step={0.1} />

      <Divider />

      <AtomSwitch atom={$enableAlign} label="Enable align" />
      <AtomSwitch atom={$enableRender} label="Enable render" />

      <SimpleGrid cols={2} spacing="xs">
        <AtomSelect atom={$renderEngine} label="Render engine" data={renderEngines} />
        <AtomSelect atom={$renderOperation} label="Render operation" data={renderOperations} />
      </SimpleGrid>

      <Button onClick={() => exportSTL($diceOutput)}>Export STL</Button>
    </>
  )
}
