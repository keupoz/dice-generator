import type { ManifoldToplevel } from 'manifold-3d'
import type { Mesh } from 'three'

// Adapted from https://github.com/elalish/manifold/blob/f11ed8da6c578d12d8fceae4b8930e0258f57b47/bindings/wasm/examples/three.ts#L91
export function three2manifold(Mesh: ManifoldToplevel['Mesh'], threeMesh: Mesh) {
  const geometry = threeMesh.geometry.clone()
  geometry.applyMatrix4(threeMesh.matrixWorld)

  // Vertices
  const vertProperties = Float32Array.from(geometry.getAttribute('position').array)

  // Vertex indices
  const triVerts = geometry.index
    ? Uint32Array.from(geometry.index.array)
    : new Uint32Array(vertProperties.length / 3).map((_, i) => i)

  const sortedGroups = [...geometry.groups].sort((groupA, groupB) => groupA.start - groupB.start)

  // Group indices / starts
  const runIndex = Uint32Array.from(sortedGroups.map(group => group.start))

  // Group ids / material indices
  const runOriginalID = Uint32Array.from(sortedGroups.map(group => group.materialIndex ?? 0))

  const mesh = new Mesh({ numProp: 3, vertProperties, triVerts, runIndex, runOriginalID })

  mesh.merge()

  return mesh
}
