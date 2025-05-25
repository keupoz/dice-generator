import type { Geom3 } from '@jscad/modeling/src/geometries/geom3'
import { toPolygons } from '@jscad/modeling/src/geometries/geom3'
import { BufferAttribute, BufferGeometry } from 'three'

// https://codesandbox.io/s/05d3b?file=/src/csg-2-geom.js
export function cad2geometry(geom: Geom3): BufferGeometry {
  const polygons = toPolygons(geom)
  const vertices: number[] = []
  const indices: number[] = []

  let index = 0

  for (const polygon of polygons) {
    const localIndices: number[] = []
    const index0 = index

    for (const vertex of polygon.vertices) {
      vertices.push(...vertex)
      localIndices.push(index++)
    }

    for (let i = 2; i < localIndices.length; i++) {
      const index1 = localIndices[i - 1] ?? index0 + i + 1
      const index2 = localIndices[i] ?? index0 + i + 2

      indices.push(index0, index1, index2)
    }
  }

  const geometry = new BufferGeometry()
  const position = new BufferAttribute(new Float32Array(vertices), 3)

  geometry.setAttribute('position', position)
  geometry.setIndex(indices)

  geometry.computeVertexNormals()

  return geometry
}
