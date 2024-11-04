import type { Mesh, Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import { createContext } from '~/utils/createContext'
import { createManifoldEvaluator } from '~/utils/evaluators/createManifoldEvaluator'
import { evaluateWithBVH } from '~/utils/evaluators/evaluateWithBVH'
import { evaluateWithCad } from '~/utils/evaluators/evaluateWithCad'
import { useManifold } from './ManifoldContext'

type Evaluator = (object: Object3D, operation: CSGOperation) => Mesh | null

export const { useEvaluator, EvaluatorProvider } = createContext('Evaluator', () => {
  const { Manifold, Mesh } = useManifold()

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
})
