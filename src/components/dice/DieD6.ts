import { cube } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

export const DieD6 = createDie({
  name: "d6",
  defaultSize: 16,
  extraOptions: {},
  base({ size }) {
    return cube({ size });
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
          faceIndex: 2,
          from: { type: "edge", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: "edge", index: 1 },
          to: { type: "edge", index: 3 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: "edge", index: 1 },
          to: { type: "edge", index: 3 },
        },
      ],
    },

    // Face 5
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: "edge", index: 2 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 6
    {
      instances: [
        {
          faceIndex: 4,
          from: { type: "edge", index: 3 },
          to: { type: "edge", index: 1 },
        },
      ],
    },
  ],
});
