import { DEG_60 } from "@/consts";
import { intersect } from "@jscad/modeling/src/operations/booleans";
import {
  rotateX,
  scale,
  translateZ,
} from "@jscad/modeling/src/operations/transforms";
import { cube, sphere } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

const TRIANGLE_PRISM = (() => {
  let cutter = cube({ size: 1 });
  cutter = translateZ(1 / 4, cutter);

  let result = cutter;

  result = intersect(result, cutter);
  result = intersect(result, rotateX(DEG_60 * 2, cutter));
  result = intersect(result, rotateX(-DEG_60 * 2, cutter));

  return result;
})();

export const DieD3 = createDie({
  name: "d3",
  defaultSize: 16,
  extraOptions: {
    segments: { value: 24, min: 24, max: 360, step: 1, label: "Segments" },
  },
  base({ size, segments }) {
    const basePrism = scale([size, size, size], TRIANGLE_PRISM);
    const baseSphere = sphere({ radius: size / 2, segments });

    return intersect(basePrism, baseSphere);
  },
  facesBase({ size }) {
    return scale([size, size, size], TRIANGLE_PRISM);
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: "edge", index: 0 },
          to: { type: "center" },
        },
        {
          faceIndex: 1,
          from: { type: "edge", index: 2 },
          to: { type: "center" },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: "edge", index: 0 },
          to: { type: "center" },
        },
        {
          faceIndex: 2,
          from: { type: "edge", index: 2 },
          to: { type: "center" },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: "edge", index: 2 },
          to: { type: "center" },
        },
        {
          faceIndex: 2,
          from: { type: "edge", index: 0 },
          to: { type: "center" },
        },
      ],
    },
  ],
});
