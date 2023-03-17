import { createSlider } from "@/hooks/controls/createSlider";
import { polyhedron } from "@jscad/modeling/src/primitives";
import { createDie, DieOptions } from "../createDie";

const t = 1 / 3;

export function createD4P(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d4p",
      defaultSize: 14,
      faceScale: 2 / 3,
      faces: [
        // 1
        {
          faceIndex: 2,
          center: { t, target: { type: "edge", index: 1 } },
        },
        // 2
        {
          faceIndex: 3,
          target: { type: "vertex", index: 2 },
          center: { t, target: { type: "edge", index: 1 } },
        },
        // 3
        {
          faceIndex: 1,
          target: { type: "vertex", index: 2 },
          center: { t, target: { type: "edge", index: 1 } },
        },
        // 4
        {
          faceIndex: 0,
          target: { type: "vertex", index: 2 },
          center: { t, target: { type: "edge", index: 1 } },
        },
      ],
      extraOptions(folder) {
        const [length1] = createSlider(folder, 1, 40, 1, 20, "Body length");
        const [length2] = createSlider(folder, 1, 40, 1, 6, "Point length");

        return { length1, length2 };
      },
      base({ size, length1, length2 }) {
        const center = size() / 2;
        const l1 = length1();
        const l2 = length2();
        const y = (length1() - length2()) / 2;

        return polyhedron({
          points: [
            // Tips
            /*
                 0
                / \
               /   \
              a-----b
            */
            [0, -l1 + y, 0], // 0
            [0, l2 + y, 0], // 1

            // Base
            /* x, z
              2------3
              |      |
              |      |
              4------5
            */
            [-center, y, center], // 2
            [center, y, center], // 3
            [-center, y, -center], // 4
            [center, y, -center], // 5
          ],

          faces: [
            [0, 5, 4],
            [0, 3, 5],
            [0, 2, 3],
            [0, 4, 2],

            [1, 4, 5],
            [1, 5, 3],
            [1, 3, 2],
            [1, 2, 4],
          ],

          orientation: "inward",
        });
      },
    },
    options
  );
}
