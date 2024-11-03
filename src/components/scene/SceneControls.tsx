import { useAppState } from '~/appState'
import { setCameraControls } from '~/utils/focusObject'
import { CameraControls } from './CameraControls'

export function SceneControls() {
  const smoothCamera = useAppState(state => state.smoothCamera)

  return (
    <CameraControls
      ref={setCameraControls}
      makeDefault
      draggingSmoothTime={smoothCamera ? 0.0625 : 0}
    />
  )
}
