import { createSlider } from "@/hooks/controls/createSlider";
import { cylinder } from "@jscad/modeling/src/primitives";
import cuboid from "@jscad/modeling/src/primitives/cuboid";
import { createDie, DieOptions } from "../createDie";

export function createD2(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d2",
      defaultSize: 16,
      faces: [
        // 1
        {
          instances: [
            {
              faceIndex: 5,
              from: { type: "edge", index: 3 },
              to: { type: "edge", index: 1 },
            },
          ],
        },
        // 2
        {
          instances: [
            {
              faceIndex: 4,
              from: { type: "edge", index: 0 },
              to: { type: "edge", index: 2 },
            },
          ],
        },
      ],
      extraOptions(folder) {
        const [height] = createSlider(folder, 1, 40, 1, 3, "Height");
        const [segments] = createSlider(folder, 4, 360, 1, 24, "Segments");

        return { height, segments };
      },
      base({ size, height, segments }) {
        return cylinder({
          radius: size() / 2,
          height: height(),
          segments: segments(),
        });
      },
      facesBase({ size, height }) {
        return cuboid({ size: [size(), size(), height()] });
      },
    },
    options
  );
}
