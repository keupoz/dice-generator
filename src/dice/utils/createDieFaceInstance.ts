import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Mat4 } from '@jscad/modeling/src/maths/mat4'
import type { Vec3 } from '@jscad/modeling/src/maths/vec3'
import type { DieFaceInstanceOptions } from './types'
import { poly3 } from '@jscad/modeling/src/geometries'
import geom3 from '@jscad/modeling/src/geometries/geom3'
import mat4 from '@jscad/modeling/src/maths/mat4'
import vec3 from '@jscad/modeling/src/maths/vec3'
import { strictAt } from '~/utils/array/strictAt'
import { centerOfMassOfEdges } from './centerOfMassOfEdges'
import { getTargetPoint } from './getTargetPoint'
import { lookAt } from './lookAt'

export interface DieFaceInstance {
  center: Vec3
  length: number
  rotationMatrix: Mat4
}

export function createDieFaceInstance(geom: Geom3, options: DieFaceInstanceOptions): DieFaceInstance {
  const polygon = strictAt(geom3.toPolygons(geom), options.faceIndex)
  const points = poly3.toPoints(polygon)
  const [x, y, z] = poly3.plane(polygon)

  const normal = vec3.fromValues(x, y, z)

  const from = getTargetPoint(points, options.from)
  const to = getTargetPoint(points, options.to)

  const center = vec3.create()

  if (options.polygonCenter) {
    centerOfMassOfEdges(center, points)
  } else {
    vec3.lerp(center, from, to, options.t ?? 0.5)
  }

  const length = vec3.distance(from, to)
  const rotationMatrix = mat4.create()

  lookAt(rotationMatrix, to, center, normal)
  mat4.rotateX(rotationMatrix, rotationMatrix, -Math.PI / 2)

  return {
    center,
    length,
    rotationMatrix,
  }
}
