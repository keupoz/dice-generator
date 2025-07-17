import type { Mesh } from 'manifold-3d'
import { polyhedron } from '@jscad/modeling/src/primitives'
import { cluster } from 'radashi'

export function manifold2cad(mesh: Mesh) {
  return polyhedron({
    points: cluster([...mesh.vertProperties], mesh.numProp as 3),
    faces: cluster([...mesh.triVerts], 3),
  })
}
