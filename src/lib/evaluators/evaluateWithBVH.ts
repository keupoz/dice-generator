import type { RenderEvaluator } from './evaluate'
import type { RenderOperation } from '~/state/render'
import { ADDITION, Evaluator, SUBTRACTION } from 'three-bvh-csg'
import { BASE_MATERIAL, FONT_MATERIAL } from '~/state/materials'
import { cad2brush } from '../converters/jscad2three'

const evaluator = new Evaluator()
evaluator.attributes = ['position', 'normal']

const OPERATIONS = {
  subtract: SUBTRACTION,
  union: ADDITION,
} satisfies Record<RenderOperation, unknown>

export const evaluateWithBVH: RenderEvaluator = (baseGeom, faceGeoms, operation) => {
  let result = cad2brush(baseGeom, BASE_MATERIAL)

  for (const faceGeom of faceGeoms) {
    const faceBrush = cad2brush(faceGeom, FONT_MATERIAL)
    result = evaluator.evaluate(result, faceBrush, OPERATIONS[operation])
  }

  return result
}
