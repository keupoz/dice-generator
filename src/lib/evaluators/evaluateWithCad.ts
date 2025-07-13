import type { RenderEvaluator } from './evaluate'
import type { RenderOperation } from '~/state/render'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { BASE_MATERIAL } from '~/state/materials'
import { cad2mesh } from '../converters/jscad2three'

const OPERATIONS = {
  subtract,
  union,
} satisfies Record<RenderOperation, unknown>

export const evaluateWithCad: RenderEvaluator = (baseGeom, faceGeoms, operation) => {
  const result = OPERATIONS[operation](baseGeom, ...faceGeoms)
  return cad2mesh(result, BASE_MATERIAL)
}
