import type { Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import { Evaluator } from 'three-bvh-csg'
import { processBrushes } from './processBrushes'

const evaluator = new Evaluator()
evaluator.attributes = ['position', 'normal']

export function evaluateWithBVH(object: Object3D, operation: CSGOperation) {
  return processBrushes(object, (brushes) => {
    let result = brushes[0]

    if (!result) {
      return null
    }

    for (let i = 1; i < brushes.length; i++) {
      const brush = brushes[i]

      if (!brush) {
        continue
      }

      result = evaluator.evaluate(result, brush, operation)
    }

    return result
  })
}
