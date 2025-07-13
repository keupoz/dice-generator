import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { ManifoldToplevel, Mesh } from 'manifold-3d'
import { toPolygons } from '@jscad/modeling/src/geometries/geom3'
import { createCache } from '~/utils/createCache'
import { cad2general } from './jscad2general'

let lastId = 0

const cache = createCache<Geom3, Mesh>()

// Adapted from https://github.com/elalish/manifold/blob/f11ed8da6c578d12d8fceae4b8930e0258f57b47/bindings/wasm/examples/three.ts#L91
export function cad2manifold(Mesh: ManifoldToplevel['Mesh'], geom: Geom3) {
  return cache(geom, () => {
    const { vertices, indices } = cad2general(toPolygons(geom))

    const mesh = new Mesh({
      numProp: 3,
      vertProperties: Float32Array.from(vertices),
      triVerts: new Uint32Array(indices),
      runOriginalID: Uint32Array.from([lastId++]),
    })

    mesh.merge()

    return mesh
  })
}
