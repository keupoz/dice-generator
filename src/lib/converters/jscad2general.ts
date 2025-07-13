import type { Poly3 } from '@jscad/modeling/src/geometries/types'

export function cad2general(polygons: Poly3[]) {
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

  return { vertices, indices }
}
