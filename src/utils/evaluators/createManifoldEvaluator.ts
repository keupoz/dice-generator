import type { ManifoldToplevel } from 'manifold-3d'
import type { Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import { Mesh as ThreeMesh } from 'three'
import { ADDITION } from 'three-bvh-csg'
import { manifold2three } from '~/utils/manifold/manifold2three'
import { three2manifold } from '~/utils/manifold/three2manifold'
import { processBrushes } from './processBrushes'

export function createManifoldEvaluator(Manifold: ManifoldToplevel['Manifold'], Mesh: ManifoldToplevel['Mesh']) {
  return function evaluateWithManifold(object: Object3D, operation: CSGOperation) {
    return processBrushes(object, (brushes) => {
      const baseBrush = brushes[0]

      if (!baseBrush) {
        return null
      }

      let result = Manifold.ofMesh(three2manifold(Mesh, baseBrush))

      for (let i = 1; i < brushes.length; i++) {
        const brush = brushes[i]

        if (!brush) {
          continue
        }

        const oldResult = result
        const manifold = Manifold.ofMesh(three2manifold(Mesh, brush))

        if (operation === ADDITION) {
          result = Manifold.union(result, manifold)
        } else {
          result = Manifold.difference(result, manifold)
        }

        oldResult.delete()
        manifold.delete()
      }

      const geometry = manifold2three(result.getMesh())
      const mesh = new ThreeMesh(geometry, baseBrush.material)

      result.delete()

      return mesh
    })
  }
}
