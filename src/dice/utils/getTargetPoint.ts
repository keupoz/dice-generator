import type { Vec3 } from '@jscad/modeling/src/maths/vec3'
import vec3 from '@jscad/modeling/src/maths/vec3'
import { slice } from '@jscad/modeling/src/operations/extrusions'
import { strictAt } from '~/utils/array/strictAt'
import { centerOfMassOfEdges } from './centerOfMassOfEdges'

export interface IndexTarget {
  type: 'edge' | 'vertex'
  index: number
}

interface CenterTarget {
  type: 'center'
}

export type FaceTarget = IndexTarget | CenterTarget

export function getTargetPoint(points: Vec3[], target: FaceTarget) {
  switch (target.type) {
    case 'edge': {
      const { edges } = slice.fromPoints(points)
      const edge = strictAt(edges, target.index)

      return vec3.lerp(vec3.create(), edge[0], edge[1], 0.5)
    }

    case 'vertex': {
      return strictAt(points, target.index)
    }

    case 'center': {
      return centerOfMassOfEdges(vec3.create(), points)
    }
  }
}
