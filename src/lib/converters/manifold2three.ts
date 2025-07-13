import type { Mesh } from 'manifold-3d'
import { BufferAttribute, BufferGeometry, InterleavedBuffer, InterleavedBufferAttribute } from 'three'

/**
 * Convert Manifold Mesh to Three.js BufferGeometry
 * @source https://github.com/elalish/manifold/blob/f11ed8da6c578d12d8fceae4b8930e0258f57b47/bindings/wasm/examples/three.ts#L123
 */
export function manifold2three(mesh: Mesh) {
  let geometry = new BufferGeometry()
  const vertProperties = new InterleavedBuffer(mesh.vertProperties, mesh.numProp)

  // Assign buffers
  geometry.setAttribute('position', new InterleavedBufferAttribute(vertProperties, 3, 0))
  geometry.setAttribute('normal', new InterleavedBufferAttribute(vertProperties, 3, 3))
  geometry.setAttribute('uv', new InterleavedBufferAttribute(vertProperties, 2, 6))
  geometry.setIndex(new BufferAttribute(mesh.triVerts, 1))

  // Create a group (material) for each ID. Note that there may be multiple
  // triangle runs returned with the same ID, though these will always be
  // sequential since they are sorted by ID. In this example there are two runs
  // for the MeshNormalMaterial, one corresponding to each input mesh that had
  // this ID. This allows runTransform to return the total transformation matrix
  // applied to each triangle run from its input mesh - even after many
  // consecutive operations.
  let id = mesh.runOriginalID[0]
  let start = mesh.runIndex[0]
  let materialIndex = 0

  for (let run = 0; run < mesh.numRun; run++) {
    const nextID = mesh.runOriginalID[run + 1]

    if (nextID !== id) {
      const end = mesh.runIndex[run + 1]

      if (start !== undefined && end !== undefined && id !== undefined) {
        geometry.addGroup(start, end - start, materialIndex)
      }

      id = nextID
      start = end
      materialIndex++
    }
  }

  geometry = geometry.toNonIndexed()
  geometry.computeVertexNormals()

  return geometry
}
