import type { Object3D } from 'three'
import { Box3, Mesh } from 'three'

export function createBoxFromObject(object: Object3D, precise?: boolean) {
  const box = new Box3()

  object.traverseVisible((child) => {
    if (!(child instanceof Mesh)) {
      return
    }

    box.expandByObject(child, precise)
  })

  return box
}
