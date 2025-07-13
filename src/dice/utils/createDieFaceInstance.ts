import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Mat4 } from '@jscad/modeling/src/maths/mat4'
import type { Vec3 } from '@jscad/modeling/src/maths/vec3'
import type { DieFaceInstanceOptions } from './types'
import { poly3 } from '@jscad/modeling/src/geometries'
import geom3 from '@jscad/modeling/src/geometries/geom3'
import { plane } from '@jscad/modeling/src/maths'
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

export function createDieFaceInstance(geom: Geom3, options: DieFaceInstanceOptions, invertRotation?: boolean): DieFaceInstance {
  const polygon = strictAt(geom3.toPolygons(geom), options.faceIndex)
  const points = poly3.toPoints(polygon)
  const [x, y, z] = plane.fromPoints(plane.create(), ...points)

  const normal = vec3.fromValues(x, y, z)

  const from = getTargetPoint(points, options.from)
  const to = getTargetPoint(points, options.to)

  let center

  if (options.polygonCenter) {
    center = centerOfMassOfEdges(points)
  } else {
    center = vec3.lerp(vec3.create(), from, to, options.t ?? 0.5)
  }

  const length = vec3.distance(from, to)

  let rotationMatrix = lookAt(to, center, normal)
  rotationMatrix = mat4.rotateX(mat4.create(), rotationMatrix, -Math.PI / 2)

  if (invertRotation) {
    rotationMatrix = mat4.invert(mat4.create(), rotationMatrix)
  }

  return {
    center,
    length,
    rotationMatrix,
  }
}
