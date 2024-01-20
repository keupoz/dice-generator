import { polyhedron } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

const t = 2 / 3;

export const DieD4P = createDie({
  name: "d4p",
  defaultSize: 14,
  alignFaceIndex: 0,
  extraOptions: {
    length1: { value: 20, min: 1, max: 40, step: 1, label: "Body length" },
    length2: { value: 6, min: 1, max: 40, step: 1, label: "Point length" },
  },
  base({ size, length1, length2 }) {
    const center = size / 2;
    const y = (length1 - length2) / 2;

    return polyhedron({
      points: [
        // Tips
        /*
             0
            / \
           /   \
          a-----b
        */
        [0, -length1 + y, 0], // 0
        [0, length2 + y, 0], // 1

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
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 2,
          from: { type: "edge", index: 1 },
          to: { type: "center" },
          t,
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: "edge", index: 1 },
          to: { type: "center" },
          t,
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: "edge", index: 1 },
          to: { type: "center" },
          t,
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: "edge", index: 1 },
          to: { type: "center" },
          t,
        },
      ],
    },
  ],
});
