import type { Mesh, Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import type { SafeManifold } from '~/utils/manifold/wrapManifoldModule'
import { createManifoldEvaluator } from '~/utils/evaluators/createManifoldEvaluator'
import { evaluateWithBVH } from '~/utils/evaluators/evaluateWithBVH'
import { evaluateWithCad } from '~/utils/evaluators/evaluateWithCad'

type Evaluator = (object: Object3D, operation: CSGOperation) => Mesh | null

export function initEvaluators(safeManifold: SafeManifold) {
  const availableEvaluators: Record<string, Evaluator> = {
    Manifold: createManifoldEvaluator(safeManifold),
    MeshBVH: evaluateWithBVH,
    JSCAD: evaluateWithCad,
  }

  return {
    availableEvaluators: Object.keys(availableEvaluators),
    getEvaluator(name: string) {
      const result = availableEvaluators[name]

      if (result === undefined) {
        throw new Error(`Unsupported evaluator "${name}"`)
      }

      return result
    },
  }
}
