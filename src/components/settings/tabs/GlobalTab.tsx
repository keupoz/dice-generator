import type { FC } from 'react'
import { Button, Divider, Select, Switch } from '@mantine/core'
import { useAtom } from 'jotai'
import { getExportObject, setAppState, useAppState } from '~/appState'
import { baseOpacityAtom, enableWireframeAtom, showGridAtom, smoothCameraAtom } from '~/atoms'
import { AVAILABLE_EVALUATORS } from '~/components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from '~/components/three/csg/availableOperations'
import { exportObject } from '~/utils/exportObject'
import { SettingsSlider } from '../controls/SettingsSlider'
import { SettingsTabContent } from '../SettingsTabContent'

export const GlobalTab: FC = () => {
  const [showGrid, setShowGrid] = useAtom(showGridAtom)
  const [smoothCamera, setSmoothCamera] = useAtom(smoothCameraAtom)
  const [baseOpacity, setBaseOpacity] = useAtom(baseOpacityAtom)
  const [enableWireframe, setEnableWireframe] = useAtom(enableWireframeAtom)

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
        onChange={e => setShowGrid(e.currentTarget.checked)}
      />

      <Switch
        label="Smooth camera"
        checked={smoothCamera}
        onChange={e => setSmoothCamera(e.currentTarget.checked)}
      />

      <Switch
        label="Enable wireframe"
        checked={enableWireframe}
        onChange={e => setEnableWireframe(e.currentTarget.checked)}
      />

      <SettingsSlider
        label="Base opacity"
        min={0.1}
        max={1}
        step={0.1}
        value={baseOpacity}
        onChange={setBaseOpacity}
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
