import { Mesh, Object3D } from "three";
import { CSGOperation } from "three-bvh-csg";
import { evaluateWithBVH, evaluateWithCad } from "./evaluate";

type Evaluator = (object: Object3D, operation: CSGOperation) => Mesh | null;

export const AVAILABLE_EVALUATORS: Record<string, Evaluator> = {
  MeshBVH: evaluateWithBVH,
  JSCAD: evaluateWithCad,
};

export function getEvaluator(name: string) {
  const result = AVAILABLE_EVALUATORS[name];

  if (result === undefined) throw new Error(`Unsupported evaluator "${name}"`);

  return result;
}
