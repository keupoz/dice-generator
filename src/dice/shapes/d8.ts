import { createDie, DieOptions } from "../createDie";
import { DieFaceConfig } from "../faces/createDieFace";
import { octahedron } from "../primitives/octahedron";

const FACE_INDICES = [0, 4, 3, 7, 2, 6, 1, 5];

export function createD8(x: number, y: number, options: DieOptions) {
  const faces = FACE_INDICES.map((faceIndex) => {
    const face: DieFaceConfig = {
      instances: [
        {
          faceIndex,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    };

    return face;
  });

  return createDie(
    x,
    y,
    {
      name: "d8",
      defaultSize: 16,
      faceScale: 0.6,
      faces,
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
