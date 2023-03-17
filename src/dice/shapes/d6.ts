import { cube } from "@jscad/modeling/src/primitives";
import { createDie, DieOptions } from "../createDie";

export function createD6(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d6",
      defaultSize: 16,
      faces: [
        // 1
        { faceIndex: 5, target: { type: "edge", index: 1 } },
        // 2
        { faceIndex: 2, target: { type: "edge", index: 2 } },
        // 3
        { faceIndex: 1, target: { type: "edge", index: 3 } },
        // 4
        { faceIndex: 0, target: { type: "edge", index: 3 } },
        // 5
        { faceIndex: 3 },
        // 6
        { faceIndex: 4 },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return cube({ size: size() });
      },
    },
    options
  );
}
