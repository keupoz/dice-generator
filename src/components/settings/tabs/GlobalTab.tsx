import type { FC } from 'react'
import { Button, Divider, Select, Switch } from '@mantine/core'
import { useAtom } from 'jotai'
import { AVAILABLE_EVALUATORS } from '~/components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from '~/components/three/csg/availableOperations'
import { getExportObject, useExportSettings } from '~/stores/ExportSettingsStore'
import { baseOpacityAtom, enableWireframeAtom, showGridAtom, smoothCameraAtom } from '~/stores/SceneSettingsStore'
import { exportObject } from '~/utils/exportObject'
import { SettingsSlider } from '../controls/SettingsSlider'
import { SettingsTabContent } from '../SettingsTabContent'

export const GlobalTab: FC = () => {
  const [showGrid, setShowGrid] = useAtom(showGridAtom)
  const [smoothCamera, setSmoothCamera] = useAtom(smoothCameraAtom)
  const [baseOpacity, setBaseOpacity] = useAtom(baseOpacityAtom)
  const [enableWireframe, setEnableWireframe] = useAtom(enableWireframeAtom)

  const exportSettings = useExportSettings()

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
        checked={exportSettings.enableAlign}
        onChange={e => useExportSettings.setState({ enableAlign: e.currentTarget.checked })}
      />

      <Switch
        label="Enable render"
        checked={exportSettings.enableRender}
        onChange={e => useExportSettings.setState({ enableRender: e.currentTarget.checked })}
      />

      <Select
        label="Render operation"
        data={Object.keys(AVAILABLE_OPERATIONS)}
        value={exportSettings.renderOperation}
        onChange={renderOperation => renderOperation && useExportSettings.setState({ renderOperation })}
      />

      <Select
        label="Render method"
        data={Object.keys(AVAILABLE_EVALUATORS)}
        value={exportSettings.renderMethod}
        onChange={renderMethod => renderMethod && useExportSettings.setState({ renderMethod })}
      />

      <Button onClick={handleExport}>Export STL</Button>
    </SettingsTabContent>
  )
}
