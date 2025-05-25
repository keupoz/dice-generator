import type { ManifoldToplevel } from 'manifold-3d'
import type { Mesh } from 'three'

let lastId = 0

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

  // Group ids / material indices
  const ids = Array.isArray(threeMesh.material) ? threeMesh.material.map(() => lastId++) : [lastId++]
  const runOriginalID = Uint32Array.from(ids)

  const mesh = new Mesh({ numProp: 3, vertProperties, triVerts, runOriginalID })

  mesh.merge()

  return mesh
}
