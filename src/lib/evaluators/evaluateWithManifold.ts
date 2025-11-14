import type { Manifold } from 'manifold-3d/manifold-encapsulated-types'
import type { RenderEvaluator } from './evaluate'
import type { RenderOperation } from '~/state/render'
import { range } from 'radashi'
import { Mesh as ThreeMesh } from 'three'
import { BASE_MATERIAL, FONT_MATERIAL } from '~/state/materials'
import { getManifold } from '~/state/resources'
import { cad2manifold } from '../converters/jscad2manifold'
import { manifold2three } from '../converters/manifold2three'

type ManifoldOperation = (M: typeof Manifold, base: Manifold, face: Manifold) => Manifold

const OPERATIONS = {
  subtract: ({ difference }, base, face) => difference(base, face),
  union: ({ union }, base, face) => union(base, face),
} satisfies Record<RenderOperation, ManifoldOperation>

export const evaluateWithManifold: RenderEvaluator = (baseGeom, faceGeoms, operation) => {
  const { Manifold, Mesh } = getManifold()
  let result = Manifold.ofMesh(cad2manifold(Mesh, baseGeom))

  for (const faceGeom of faceGeoms) {
    const faceManifold = Manifold.ofMesh(cad2manifold(Mesh, faceGeom))
    const newResult = OPERATIONS[operation](Manifold, result, faceManifold)

    result.delete()
    faceManifold.delete()

    result = newResult
  }

  const geometry = manifold2three(result.getMesh())
  const threeMesh = new ThreeMesh(geometry, [BASE_MATERIAL, ...range(0, faceGeoms.length - 1, FONT_MATERIAL)])

  result.delete()

  return threeMesh
}
