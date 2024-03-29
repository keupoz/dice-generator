import { CAMERA_POSITION } from "@/consts";
import { CameraControls } from "@react-three/drei";
import { Box3, Object3D, Vector3 } from "three";

let cameraControls: CameraControls | null = null;

export function setCameraControls(value: CameraControls | null) {
  cameraControls = value;
}

export function focusObject(object: Object3D, repositionCamera = false) {
  if (!cameraControls) return;

  const box = new Box3();
  box.setFromObject(object);
  const target = box.getCenter(new Vector3());

  if (repositionCamera) {
    void cameraControls.setLookAt(
      target.x + 32,
      target.y + 32,
      target.z + 32,
      target.x,
      target.y,
      target.z,
      true
    );
  } else {
    void cameraControls.setTarget(target.x, target.y, target.z, true);
  }
}

export function resetFocus(e: MouseEvent) {
  if (e.type !== "dblclick") return;

  cameraControls?.setLookAt(
    CAMERA_POSITION,
    CAMERA_POSITION,
    CAMERA_POSITION,
    0,
    0,
    0,
    true
  );
}
