import { createSlider } from "@/hooks/controls/createSlider";
import { d60 } from "@/utils/math";
import { intersect } from "@jscad/modeling/src/operations/booleans";
import {
  rotateX,
  scale,
  translateZ,
} from "@jscad/modeling/src/operations/transforms";
import { cube, sphere } from "@jscad/modeling/src/primitives";
import { createMemo } from "solid-js";
import { createDie, DieOptions } from "../createDie";

const TRIANGLE_PRISM = (() => {
  let cutter = cube({ size: 1 });
  cutter = translateZ(1 / 4, cutter);

  let result = cutter;

  result = intersect(result, cutter);
  result = intersect(result, rotateX(d60 * 2, cutter));
  result = intersect(result, rotateX(-d60 * 2, cutter));

  return result;
})();

export function createD3(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d3",
      defaultSize: 16,
      faceScale: 1 / 3,
      faces: [
        {
          faceIndex: 0,
          center: { t: 0.5, target: { type: "edge", index: 0 } },
          extraInstances: [
            {
              faceIndex: 1,
              center: { t: 0.5, target: { type: "edge", index: 2 } },
            },
          ],
        },
        {
          faceIndex: 1,
          target: { type: "edge", index: 2 },
          center: { t: 0.5, target: { type: "edge", index: 0 } },
          extraInstances: [
            {
              faceIndex: 2,
              target: { type: "edge", index: 0 },
              center: { t: 0.5, target: { type: "edge", index: 2 } },
            },
          ],
        },
        {
          faceIndex: 0,
          target: { type: "edge", index: 0 },
          center: { t: 0.5, target: { type: "edge", index: 2 } },
          extraInstances: [
            {
              faceIndex: 2,
              target: { type: "edge", index: 2 },
              center: { t: 0.5, target: { type: "edge", index: 0 } },
            },
          ],
        },
      ],
      extraOptions(folder, size) {
        const [segments] = createSlider(folder, 24, 360, 1, 24, "Segments");

        const basePrism = createMemo(() => {
          return scale([size(), size(), size()], TRIANGLE_PRISM);
        });

        return { segments, basePrism };
      },
      base({ basePrism, size, segments }) {
        const baseSphere = sphere({ radius: size() / 2, segments: segments() });

        return intersect(basePrism(), baseSphere);
      },
      facesBase({ basePrism }) {
        return basePrism();
      },
    },
    options
  );
}
