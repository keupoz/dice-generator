import { createSlider } from "@/hooks/controls/createSlider";
import { d90 } from "@/utils/math";
import { createDie, DieOptions } from "../createDie";
import { DieFaceConfig } from "../faces/createDieFace";
import { trapezohedron } from "../primitives/trapezohedron";

const FACE_INDICES = [0, 8, 2, 5, 3, 9, 1, 7, 4, 6];

export function createD10(
  x: number,
  y: number,
  options: DieOptions,
  isD100 = false
) {
  const faces = FACE_INDICES.map((faceIndex, i) => {
    const face: DieFaceConfig = {
      instances: [
        {
          faceIndex,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "vertex", index: 2 },
        },
      ],
    };

    if (i === 9) {
      face.text = "0";
    }

    if (isD100) {
      face.text ??= `${i + 1}`;
      face.text += "0";
      face.localRotation = d90;
    }

    return face;
  });

  return createDie(
    x,
    y,
    {
      name: isD100 ? "d100" : "d10",
      defaultSize: 16,
      faceScale: isD100 ? 0.35 : 0.5,
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
