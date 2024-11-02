import { Button, Divider, SimpleGrid } from '@mantine/core'
import { appState, getExportObject } from '~/appState'
import { AVAILABLE_EVALUATORS } from '~/components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from '~/components/three/csg/availableOperations'
import { StoreSelect } from '~/components/ui/StoreSelect'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { StoreSwitch } from '~/components/ui/StoreSwitch'
import { exportObject } from '~/utils/exportObject'
import { SettingsTabContent } from '../SettingsTabContent'

export function GlobalTab() {
  function handleExport() {
    exportObject(getExportObject())
  }

  return (
    <SettingsTabContent value="global">
      <StoreSwitch
        store={appState}
        storeProp="showGrid"
        label="Show grid"
      />

      <StoreSwitch
        store={appState}
        storeProp="smoothCamera"
        label="Smooth camera"
      />

      <StoreSwitch
        store={appState}
        storeProp="enableWireframe"
        label="Enable wireframe"
      />

      <StoreSlider
        store={appState}
        storeProp="baseOpacity"
        label="Base opacity"
        min={0.1}
        max={1}
        step={0.1}
      />

      <Divider />

      <StoreSwitch
        store={appState}
        storeProp="enableAlign"
        label="Enable align"
      />

      <StoreSwitch
        store={appState}
        storeProp="enableRender"
        label="Enable render"
      />

      <SimpleGrid cols={2} spacing="xs">
        <StoreSelect
          store={appState}
          storeProp="renderOperation"
          label="Render operation"
          data={Object.keys(AVAILABLE_OPERATIONS)}
        />

        <StoreSelect
          store={appState}
          storeProp="renderEngine"
          label="Render engine"
          data={Object.keys(AVAILABLE_EVALUATORS)}
        />
      </SimpleGrid>

      <Button onClick={handleExport}>Export STL</Button>
    </SettingsTabContent>
  )
}
