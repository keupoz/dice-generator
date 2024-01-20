import { trapezohedron } from "@/utils/shapes/trapezohedron";
import { createDie } from "./utils/createDie";
import { DieFaceConfig } from "./utils/types";

function createD10(isD100: boolean) {
  return createDie({
    name: isD100 ? "d00" : "d10",
    defaultSize: 16,
    defaultFontScale: isD100 ? 0.35 : 0.5,
    alignFaceIndex: 0,
    invertAlignMatrix: true,
    extraOptions: {
      radius: { value: 8, min: 1, max: 40, step: 1, label: "Radius" },
    },
    base({ size, radius }) {
      return trapezohedron(10, size / 2, radius);
    },
    faces: [
      createFaceConfig(isD100, 0, 0),
      createFaceConfig(isD100, 8, 1),
      createFaceConfig(isD100, 2, 2),
      createFaceConfig(isD100, 5, 3),
      createFaceConfig(isD100, 3, 4),
      createFaceConfig(isD100, 9, 5),
      createFaceConfig(isD100, 1, 6),
      createFaceConfig(isD100, 7, 7),
      createFaceConfig(isD100, 4, 8),
      createFaceConfig(isD100, 6, 9),
    ],
  });
}

function createFaceConfig(isD100: boolean, index: number, i: number) {
  const config: DieFaceConfig = {
    instances: [
      {
        faceIndex: index,
        polygonCenter: true,
        from: { type: "vertex", index: 0 },
        to: { type: "vertex", index: 2 },
      },
    ],
  };

  if (i === 9) {
    config.text = "0";
  }

  if (isD100) {
    config.text ??= `${i + 1}`;
    config.text += "0";
    config.localRotation = Math.PI / 2;
  }

  return config;
}

export const DieD10 = createD10(false);
export const DieD100 = createD10(true);
