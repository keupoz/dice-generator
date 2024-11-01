import { Button, Divider, Select, Switch } from '@mantine/core'
import { getExportObject, setAppState, useAppState } from '~/appState'
import { AVAILABLE_EVALUATORS } from '~/components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from '~/components/three/csg/availableOperations'
import { exportObject } from '~/utils/exportObject'
import { Slider } from '../../ui/Slider'
import { SettingsTabContent } from '../SettingsTabContent'

export function GlobalTab() {
  const showGrid = useAppState(state => state.showGrid)
  const smoothCamera = useAppState(state => state.smoothCamera)
  const baseOpacity = useAppState(state => state.baseOpacity)
  const enableWireframe = useAppState(state => state.enableWireframe)

  const enableAlign = useAppState(state => state.enableAlign)
  const enableRender = useAppState(state => state.enableRender)
  const renderOperation = useAppState(state => state.renderOperation)
  const renderMethod = useAppState(state => state.renderMethod)

  function handleExport() {
    exportObject(getExportObject())
  }

  return (
    <SettingsTabContent value="global">
      <Switch
        label="Show grid"
        checked={showGrid}
        onChange={e => setAppState({ showGrid: e.currentTarget.checked })}
      />

      <Switch
        label="Smooth camera"
        checked={smoothCamera}
        onChange={e => setAppState({ smoothCamera: e.currentTarget.checked })}
      />

      <Switch
        label="Enable wireframe"
        checked={enableWireframe}
        onChange={e => setAppState({ enableWireframe: e.currentTarget.checked })}
      />

      <Slider
        label="Base opacity"
        min={0.1}
        max={1}
        step={0.1}
        value={baseOpacity}
        onChange={baseOpacity => setAppState({ baseOpacity })}
      />

      <Divider />

      <Switch
        label="Enable align"
        checked={enableAlign}
        onChange={e => setAppState({ enableAlign: e.currentTarget.checked })}
      />

      <Switch
        label="Enable render"
        checked={enableRender}
        onChange={e => setAppState({ enableRender: e.currentTarget.checked })}
      />

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

      <Button onClick={handleExport}>Export STL</Button>
    </SettingsTabContent>
  )
}
