import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Mat4 } from '@jscad/modeling/src/maths/mat4'
import geom3 from '@jscad/modeling/src/geometries/geom3'
import mat4 from '@jscad/modeling/src/maths/mat4'
import plane from '@jscad/modeling/src/maths/plane'
import vec3 from '@jscad/modeling/src/maths/vec3'
import { strictAt } from '~/utils/array/strictAt'

export function alignByGeom(out: Mat4, geom: Geom3, faceIndex: number) {
  const polygon = strictAt(geom3.toPolygons(geom), faceIndex)
  const facePlane = plane.fromPoints(plane.create(), ...polygon.vertices)
  const projectionPoint = plane.projectionOfPoint(facePlane, [0, 0, 0])

  const [x, y, z] = facePlane

  mat4.fromVectorRotation(out, [x, y, z], [0, -1, 0])
  mat4.translate(out, out, vec3.negate(vec3.create(), projectionPoint))

  return out
}
