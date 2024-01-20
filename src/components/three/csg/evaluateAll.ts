import { Object3D } from "three";
import { Brush, CSGOperation, Evaluator } from "three-bvh-csg";

export function evaluateAll(
  evaluator: Evaluator,
  object: Object3D,
  operation: CSGOperation
) {
  const parent = object.parent;

  object.removeFromParent();
  object.updateMatrixWorld(true);

  const brushes: Brush[] = [];

  object.traverse((child) => {
    if (child.visible && child instanceof Brush) {
      brushes.push(child);
    }
  });

  let result = brushes[0];

  if (!result) return null;

  for (let i = 1; i < brushes.length; i++) {
    const brush = brushes[i];

    if (!brush) continue;

    result = evaluator.evaluate(result, brush, operation);
  }

  parent?.add(object);

  return result;
}
