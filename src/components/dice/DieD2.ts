import { cuboid, cylinder } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

export const DieD2 = createDie({
  name: "d2",
  defaultSize: 16,
  extraOptions: {
    height: { value: 3, min: 1, max: 40, step: 1, label: "Height" },
    segments: { value: 24, min: 4, max: 360, step: 1, label: "Segments" },
  },
  base({ size, height, segments }) {
    return cylinder({ radius: size / 2, height, segments });
  },
  facesBase({ size, height }) {
    return cuboid({ size: [size, size, height] });
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 5,
          from: { type: "edge", index: 3 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 2
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
});
