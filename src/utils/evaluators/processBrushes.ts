import type { Mesh, Object3D } from 'three'
import { Brush } from 'three-bvh-csg'

export function processBrushes(object: Object3D, callback: (brushes: Brush[]) => Mesh | null) {
  const parent = object.parent

  object.removeFromParent()
  object.updateMatrixWorld(true)

  const brushes: Brush[] = []

  object.traverse((child) => {
    if (child.visible && child instanceof Brush) {
      brushes.push(child)
    }
  })

  const result = callback(brushes)

  parent?.add(object)

  return result
}
