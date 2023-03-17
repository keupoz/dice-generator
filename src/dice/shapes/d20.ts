import { createDie, DieOptions } from "../createDie";
import { icosahedron } from "../primitives/icosahedron";

export function createD20(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d20",
      defaultSize: 16,
      faceScale: 0.5,
      faces: [
        // 1
        { faceIndex: 0, target: { type: "edge", index: 1 } },
        // 2
        { faceIndex: 16, target: { type: "edge", index: 2 } },
        // 3
        { faceIndex: 12, target: { type: "edge", index: 2 } },
        // 4
        { faceIndex: 18, target: { type: "edge", index: 2 } },
        // 5
        { faceIndex: 3, target: { type: "edge", index: 0 } },
        // 6
        { faceIndex: 7, target: { type: "edge", index: 0 } },
        // 7
        { faceIndex: 1, target: { type: "edge", index: 1 } },
        // 8
        { faceIndex: 5 },
        // 9
        { faceIndex: 10, target: { type: "edge", index: 0 } },
        // 10
        { faceIndex: 14, target: { type: "edge", index: 2 } },
        // 11
        { faceIndex: 19, target: { type: "edge", index: 0 } },
        // 12
        { faceIndex: 15, target: { type: "edge", index: 2 } },
        // 13
        { faceIndex: 4, target: { type: "edge", index: 0 } },
        // 14
        { faceIndex: 8, target: { type: "edge", index: 0 } },
        // 15
        { faceIndex: 2, target: { type: "edge", index: 1 } },
        // 16
        { faceIndex: 6, target: { type: "edge", index: 1 } },
        // 17
        { faceIndex: 13, target: { type: "edge", index: 2 } },
        // 18
        { faceIndex: 17, target: { type: "edge", index: 1 } },
        // 19
        { faceIndex: 11, target: { type: "edge", index: 0 } },
        // 20
        { faceIndex: 9 },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return icosahedron(size());
      },
    },
    options
  );
}
