import { createDie, DieOptions } from "../createDie";
import { dodecahedron } from "../primitives/dodecahedron";

export function createD12(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d12",
      defaultSize: 16,
      faceScale: 0.6,
      faces: [
        // 1
        { faceIndex: 8 },
        // 2
        { faceIndex: 7, target: { type: "edge", index: 0 } },
        // 3
        { faceIndex: 4, target: { type: "edge", index: 2 } },
        // 4
        { faceIndex: 6, target: { type: "edge", index: 1 } },
        // 5
        { faceIndex: 2, target: { type: "edge", index: 4 } },
        // 6
        { faceIndex: 5, target: { type: "edge", index: 3 } },
        // 7
        { faceIndex: 10, target: { type: "edge", index: 1 } },
        // 8
        { faceIndex: 11, target: { type: "edge", index: 0 } },
        // 9
        { faceIndex: 1 },
        // 10
        { faceIndex: 0, target: { type: "edge", index: 2 } },
        // 11
        { faceIndex: 3, target: { type: "edge", index: 4 } },
        // 12
        { faceIndex: 9, target: { type: "edge", index: 4 } },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return dodecahedron(size() / 2);
      },
    },
    options
  );
}
