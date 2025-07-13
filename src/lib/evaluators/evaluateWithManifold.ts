import type { Manifold } from 'manifold-3d/manifold-encapsulated-types'
import type { RenderEvaluator } from './evaluate'
import type { RenderOperation } from '~/state/render'
import { range } from 'radashi'
import { Mesh as ThreeMesh } from 'three'
import { BASE_MATERIAL, FONT_MATERIAL } from '~/state/materials'
import { cad2manifold } from '../converters/jscad2manifold'
import { manifold2three } from '../converters/manifold2three'
import { getSafeManifold } from '../manifold/instance'

type ManifoldOperation = (M: typeof Manifold, base: Manifold, face: Manifold) => Manifold

const OPERATIONS = {
  subtract: ({ difference }, base, face) => difference(base, face),
  union: ({ union }, base, face) => union(base, face),
} satisfies Record<RenderOperation, ManifoldOperation>

export const evaluateWithManifold: RenderEvaluator = (baseGeom, faceGeoms, operation) => {
  const result = getSafeManifold()?.(({ Manifold, Mesh }) => {
    let result = Manifold.ofMesh(cad2manifold(Mesh, baseGeom))

    for (const faceGeom of faceGeoms) {
      const faceManifold = Manifold.ofMesh(cad2manifold(Mesh, faceGeom))
      result = OPERATIONS[operation](Manifold, result, faceManifold)
    }

    const geometry = manifold2three(result.getMesh())
    const mesh = new ThreeMesh(geometry, [BASE_MATERIAL, ...range(0, faceGeoms.length - 1, FONT_MATERIAL)])

    return mesh
  })

  result?.cleanup()
  return result?.value
}
