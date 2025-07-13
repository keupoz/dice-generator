import type { Geom3 } from '@jscad/modeling/src/geometries/geom3'
import type { Poly3 } from '@jscad/modeling/src/geometries/types'
import type { Material } from 'three'
import { BufferAttribute, BufferGeometry, Matrix4, Mesh } from 'three'
import { Brush } from 'three-bvh-csg'
import { createCache } from '~/utils/createCache'
import { cad2general } from './jscad2general'

const cache = createCache<Poly3[], BufferGeometry>()

// https://codesandbox.io/s/05d3b?file=/src/csg-2-geom.js
export function cad2geometry(geom: Geom3): BufferGeometry {
  return cache(geom.polygons, () => {
    const { vertices, indices } = cad2general(geom.polygons)

    const geometry = new BufferGeometry()
    const position = new BufferAttribute(new Float32Array(vertices), 3)

    geometry.setAttribute('position', position)
    geometry.setIndex(indices)

    geometry.computeVertexNormals()

    return geometry
  })
}

export function cad2mesh<TMaterial extends Material | Material[]>(geom: Geom3, material?: TMaterial) {
  const geometry = cad2geometry(geom)
  const mesh = new Mesh(geometry, material)

  mesh.applyMatrix4(new Matrix4().fromArray(geom.transforms))

  return mesh
}

export function cad2brush<TMaterial extends Material | Material[]>(geom: Geom3, material?: TMaterial) {
  const geometry = cad2geometry(geom)
  const brush = new Brush(geometry, material)

  brush.applyMatrix4(new Matrix4().fromArray(geom.transforms))
  brush.updateMatrixWorld(true)

  return brush
}
