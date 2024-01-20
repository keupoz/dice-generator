import { octahedron } from "@/utils/shapes/octahedron";
import { createDie } from "./utils/createDie";
import { DieFaceConfig } from "./utils/types";

function createFaceConfig(index: number): DieFaceConfig {
  return {
    instances: [
      {
        faceIndex: index,
        polygonCenter: true,
        from: { type: "vertex", index: 0 },
        to: { type: "edge", index: 2 },
      },
    ],
  };
}

export const DieD8 = createDie({
  name: "d8",
  defaultSize: 16,
  defaultFontScale: 0.6,
  alignFaceIndex: 0,
  invertAlignMatrix: true,
  extraOptions: {},
  base({ size }) {
    return octahedron(size / 2);
  },
  faces: [
    createFaceConfig(0),
    createFaceConfig(4),
    createFaceConfig(3),
    createFaceConfig(7),
    createFaceConfig(2),
    createFaceConfig(6),
    createFaceConfig(1),
    createFaceConfig(5),
  ],
});
