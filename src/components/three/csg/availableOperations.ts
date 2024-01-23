import { ADDITION, CSGOperation, SUBTRACTION } from "three-bvh-csg";

export const AVAILABLE_OPERATIONS: Record<string, CSGOperation> = {
  Subtract: SUBTRACTION,
  Union: ADDITION,
};

export function getOperation(name: string) {
  const result = AVAILABLE_OPERATIONS[name];

  if (result === undefined) throw new Error(`Unsupported operation "${name}"`);

  return result;
}
