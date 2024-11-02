import { Button, Divider, Select, SimpleGrid } from '@mantine/core'
import { appState, getExportObject, setAppState, useAppState } from '~/appState'
import { AVAILABLE_EVALUATORS } from '~/components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from '~/components/three/csg/availableOperations'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { StoreSwitch } from '~/components/ui/StoreSwitch'
import { exportObject } from '~/utils/exportObject'
import { SettingsTabContent } from '../SettingsTabContent'

export function GlobalTab() {
  const renderOperation = useAppState(state => state.renderOperation)
  const renderMethod = useAppState(state => state.renderMethod)

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
        <Select
          label="Render operation"
          data={Object.keys(AVAILABLE_OPERATIONS)}
          value={renderOperation}
          onChange={renderOperation => renderOperation && setAppState({ renderOperation })}
        />

        <Select
          label="Render method"
          data={Object.keys(AVAILABLE_EVALUATORS)}
          value={renderMethod}
          onChange={renderMethod => renderMethod && setAppState({ renderMethod })}
        />
      </SimpleGrid>

      <Button onClick={handleExport}>Export STL</Button>
    </SettingsTabContent>
  )
}
