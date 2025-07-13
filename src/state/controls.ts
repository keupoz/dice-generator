import type { Object3D } from 'three'
import { setFocus } from '@keupoz/r3f-utils'
import CameraControls from 'camera-controls'

let controls: CameraControls | undefined

export function setControls(value: unknown) {
  if (value instanceof CameraControls) {
    controls = value
  }
}

export function focusObject(object: Object3D | undefined) {
  if (!controls || !object) return
  setFocus(controls, object)
}
