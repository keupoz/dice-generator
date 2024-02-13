import { cad2geometry } from "@/utils/cad2three";
import { mesh2cad } from "@/utils/three2cad";
import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { Mesh, Object3D } from "three";
import { ADDITION, Brush, CSGOperation, Evaluator } from "three-bvh-csg";

const evaluator = new Evaluator();
evaluator.attributes = ["position", "normal"];

export function evaluateWithBVH(object: Object3D, operation: CSGOperation) {
  return processBrushes(object, (brushes) => {
    let result = brushes[0];

    if (!result) return null;

    for (let i = 1; i < brushes.length; i++) {
      const brush = brushes[i];

      if (!brush) continue;

      result = evaluator.evaluate(result, brush, operation);
    }

    return result;
  });
}

export function evaluateWithCad(object: Object3D, operation: CSGOperation) {
  return processBrushes(object, (brushes) => {
    const baseBrush = brushes[0];

    if (!baseBrush) return null;

    let result = mesh2cad(baseBrush);

    for (let i = 1; i < brushes.length; i++) {
      const brush = brushes[i];

      if (!brush) continue;

      const cad = mesh2cad(brush);

      if (operation === ADDITION) {
        result = union(result, cad);
      } else {
        result = subtract(result, cad);
      }
    }

    const geometry = cad2geometry(result);
    const mesh = new Mesh(geometry, baseBrush.material);

    return mesh;
  });
}

function processBrushes(
  object: Object3D,
  callback: (brushes: Brush[]) => Mesh | null
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

  const result = callback(brushes);

  parent?.add(object);

  return result;
}
