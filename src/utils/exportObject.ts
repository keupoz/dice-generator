import type { Object3D } from 'three'
import { getAppState, setAppState } from '~/appState'
import { exportSTL } from './exportSTL'

export function exportObject(object: Object3D | null, name?: string) {
  const { enableAlign, enableRender } = getAppState()

  setAppState({ enableAlign: true, enableRender: true })

  setTimeout(() => {
    if (object) {
      exportSTL(object, name)
    }

    setAppState({ enableAlign, enableRender })
  })
}
