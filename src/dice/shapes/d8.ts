import { createDie, DieOptions } from "../createDie";
import { octahedron } from "../primitives/octahedron";

export function createD8(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d8",
      defaultSize: 16,
      faces: [
        // 1
        { faceIndex: 0 },
        // 2
        { faceIndex: 4, target: { type: "edge", index: 2 } },
        // 3
        { faceIndex: 3 },
        // 4
        { faceIndex: 7, target: { type: "edge", index: 2 } },
        // 5
        { faceIndex: 2 },
        // 6
        { faceIndex: 6, target: { type: "edge", index: 2 } },
        // 7
        { faceIndex: 1 },
        // 8
        { faceIndex: 5, target: { type: "edge", index: 2 } },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return octahedron(size());
      },
    },
    options
  );
}
