import type { Vec3 } from '@jscad/modeling/src/maths/vec3'
import vec3 from '@jscad/modeling/src/maths/vec3'
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
      const vertex0 = strictAt(points, target.index - 1)
      const vertex1 = strictAt(points, target.index)

      return vec3.lerp(vec3.create(), vertex0, vertex1, 0.5)
    }

    case 'vertex': {
      return strictAt(points, target.index)
    }

    case 'center': {
      return centerOfMassOfEdges(vec3.create(), points)
    }
  }
}
