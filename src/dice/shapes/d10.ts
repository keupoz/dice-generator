import { createSlider } from "@/hooks/controls/createSlider";
import { d90 } from "@/utils/math";
import { createDie, DieOptions } from "../createDie";
import { DieFaceConfig } from "../faces/createDieFace";
import { trapezohedron } from "../primitives/trapezohedron";

export function createD10(
  x: number,
  y: number,
  options: DieOptions,
  isD100 = false
) {
  const faces: DieFaceConfig[] = [
    // 1
    { faceIndex: 0 },
    // 2
    { faceIndex: 8, target: { type: "vertex", index: 2 } },
    // 3
    { faceIndex: 2 },
    // 4
    { faceIndex: 5, target: { type: "vertex", index: 2 } },
    // 5
    { faceIndex: 3 },
    // 6
    { faceIndex: 9, target: { type: "vertex", index: 2 } },
    // 7
    { faceIndex: 1 },
    // 8
    { faceIndex: 7, target: { type: "vertex", index: 2 } },
    // 9
    { faceIndex: 4 },
    // 10
    { faceIndex: 6, target: { type: "vertex", index: 2 }, text: "0" },
  ];

  if (isD100) {
    faces.forEach((face, i) => {
      face.text = `${face.text ?? i + 1}${0}`;
      face.localRotation = (face.localRotation ?? 0) + d90;
    });
  }

  return createDie(
    x,
    y,
    {
      name: isD100 ? "d100" : "d10",
      defaultSize: 16,
      faceScale: isD100 ? 0.5 : undefined,
      faces,
      extraOptions(folder, size) {
        const [radius] = createSlider(folder, 1, 40, 1, size() / 2, "Radius");

        return { radius };
      },
      base({ size, radius }) {
        return trapezohedron(10, size() / 2, radius());
      },
    },
    options
  );
}
