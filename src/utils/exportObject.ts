import type { Object3D } from 'three'
import { useExportSettings } from '~/stores/ExportSettingsStore'
import { exportSTL } from './exportSTL'

export function exportObject(object: Object3D | null, name?: string) {
  const { enableAlign, enableRender } = useExportSettings.getState()

  useExportSettings.setState({ enableAlign: true, enableRender: true })

  setTimeout(() => {
    if (object) {
      exportSTL(object, name)
    }

    useExportSettings.setState({ enableAlign, enableRender })
  })
}
