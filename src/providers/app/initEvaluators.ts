import type { ManifoldToplevel } from 'manifold-3d'
import type { Mesh, Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import { createManifoldEvaluator } from '~/utils/evaluators/createManifoldEvaluator'
import { evaluateWithBVH } from '~/utils/evaluators/evaluateWithBVH'
import { evaluateWithCad } from '~/utils/evaluators/evaluateWithCad'

type Evaluator = (object: Object3D, operation: CSGOperation) => Mesh | null

export function initEvaluators({ Manifold, Mesh }: ManifoldToplevel) {
  const availableEvaluators: Record<string, Evaluator> = {
    Manifold: createManifoldEvaluator(Manifold, Mesh),
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
