import type { Material, Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import type { SafeManifold } from '../manifold/wrapManifoldModule'
import { Mesh as ThreeMesh } from 'three'
import { ADDITION } from 'three-bvh-csg'
import { manifold2three } from '~/utils/manifold/manifold2three'
import { three2manifold } from '~/utils/manifold/three2manifold'
import { processBrushes } from './processBrushes'

export function createManifoldEvaluator(safeManifold: SafeManifold) {
  return function evaluateWithManifold(object: Object3D, operation: CSGOperation) {
    const result = safeManifold(({ Manifold, Mesh }) => {
      return processBrushes(object, (brushes) => {
        const baseBrush = brushes[0]

        if (!baseBrush) return null

        const materials: Material[] = []

        function collectMaterial(mesh: ThreeMesh) {
          if (Array.isArray(mesh.material)) {
            materials.push(...mesh.material)
          } else {
            materials.push(mesh.material)
          }
        }

        let result = Manifold.ofMesh(three2manifold(Mesh, baseBrush))
        collectMaterial(baseBrush)

        for (let i = 1; i < brushes.length; i++) {
          const brush = brushes[i]

          if (!brush) continue

          const manifold = Manifold.ofMesh(three2manifold(Mesh, brush))
          collectMaterial(brush)

          if (operation === ADDITION) {
            result = Manifold.union(result, manifold)
          } else {
            result = Manifold.difference(result, manifold)
          }
        }

        const geometry = manifold2three(result.getMesh())
        const mesh = new ThreeMesh(geometry, materials)

        return mesh
      })
    })

    result.cleanup()

    return result.value
  }
}
