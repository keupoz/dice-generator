import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import geom3 from '@jscad/modeling/src/geometries/geom3'
import poly3 from '@jscad/modeling/src/geometries/poly3'
import vec3 from '@jscad/modeling/src/maths/vec3'
import { subtract } from '@jscad/modeling/src/operations/booleans'
import { strictAt } from '~/utils/array/strictAt'

export function createBlank(base: Geom3, delta: number) {
  const extrudedPolygons = geom3.toPolygons(base).map((polygon) => {
    const [x, y, z] = poly3.plane(polygon)
    const normal = vec3.fromValues(x, y, z)

    vec3.scale(normal, normal, -delta)

    const basePoints = poly3.toPoints(polygon)
    const extrudedPoints = basePoints.map(point => vec3.add(vec3.create(), normal, point))
    const faces = [
      poly3.fromPoints([...extrudedPoints].reverse()),
      polygon,
      poly3.fromPoints([
        strictAt(extrudedPoints, -1),
        strictAt(extrudedPoints, 0),
        strictAt(basePoints, 0),
        strictAt(basePoints, -1),
      ]),
    ]

    for (let i = 1; i < extrudedPoints.length; i++) {
      faces.push(poly3.fromPoints([
        strictAt(extrudedPoints, i - 1),
        strictAt(extrudedPoints, i),
        strictAt(basePoints, i),
        strictAt(basePoints, i - 1),
      ]))
    }

    return geom3.create(faces)
  })

  return subtract(base, extrudedPolygons)
}
