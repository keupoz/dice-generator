import { createDie, DieOptions } from "../createDie";
import { rhombicDodecahedron } from "../primitives/rhombicDodecahedron";

export function createD12r(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d12r",
      defaultSize: 16,
      faceScale: 0.6,
      faces: [
        // 1
        { faceIndex: 11, target: { type: "vertex", index: 2 } },
        // 2
        { faceIndex: 9, target: { type: "vertex", index: 0 } },
        // 3
        { faceIndex: 4 },
        // 4
        { faceIndex: 0, target: { type: "vertex", index: 0 } },
        // 5
        { faceIndex: 5, target: { type: "vertex", index: 0 } },
        // 6
        { faceIndex: 10, target: { type: "vertex", index: 0 } },
        // 7
        { faceIndex: 1, target: { type: "vertex", index: 0 } },
        // 8
        { faceIndex: 2, target: { type: "vertex", index: 2 } },
        // 9
        { faceIndex: 6, target: { type: "vertex", index: 0 } },
        // 10
        { faceIndex: 7 },
        // 11
        { faceIndex: 3, target: { type: "vertex", index: 0 } },
        // 12
        { faceIndex: 8, target: { type: "vertex", index: 2 } },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return rhombicDodecahedron(size() / 2);
      },
    },
    options
  );
}
