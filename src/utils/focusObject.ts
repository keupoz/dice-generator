import type { Object3D } from 'three'
import CameraControls from 'camera-controls'
import { CAMERA_POSITION } from '~/consts'

let cameraControls: CameraControls | null = null

export function setCameraControls(value: CameraControls | null) {
  cameraControls = value
}

export function focusObject(object: Object3D) {
  if (!cameraControls) {
    return
  }

  const sphere = CameraControls.createBoundingSphere(object)
  sphere.radius += 5
  cameraControls.fitToSphere(sphere, true)
}

export function resetFocus(e: MouseEvent) {
  if (e.type !== 'dblclick') {
    return
  }

  cameraControls?.setLookAt(
    CAMERA_POSITION,
    CAMERA_POSITION,
    CAMERA_POSITION,
    0,
    0,
    0,
    true,
  )
}
