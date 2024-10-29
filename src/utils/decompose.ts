import type { Matrix4, Vector3Tuple } from 'three'
import { Euler, Quaternion, Vector3 } from 'three'

export interface Decomposition {
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale: Vector3Tuple
}

export function decompose(matrix: Matrix4): Decomposition {
  const position = new Vector3()
  const quaternion = new Quaternion()
  const rotation = new Euler()
  const scale = new Vector3()

  matrix.decompose(position, quaternion, scale)
  rotation.setFromQuaternion(quaternion)

  return {
    position: position.toArray(),
    rotation: rotation.toArray() as Vector3Tuple,
    scale: scale.toArray(),
  }
}
