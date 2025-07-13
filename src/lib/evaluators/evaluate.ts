import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Mesh } from 'three'
import type { RenderEngine, RenderOperation } from '~/state/render'
import { evaluateWithBVH } from './evaluateWithBVH'
import { evaluateWithCad } from './evaluateWithCad'
import { evaluateWithManifold } from './evaluateWithManifold'

export type RenderEvaluator = (baseGeom: Geom3, faceGeoms: Geom3[], operation: RenderOperation) => Mesh | undefined

const EVALUATORS = {
  jscad: evaluateWithCad,
  manifold: evaluateWithManifold,
  threebvh: evaluateWithBVH,
} satisfies Record<RenderEngine, RenderEvaluator>

export function evaluate(renderEngine: RenderEngine, baseGeom: Geom3, faceGeoms: Geom3[], operation: RenderOperation) {
  return EVALUATORS[renderEngine](baseGeom, faceGeoms, operation)
}
