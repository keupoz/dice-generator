import { polyhedron } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

export const DieD4 = createDie({
  name: "d4",
  defaultSize: 16,
  defaultFontScale: 0.5,
  extraOptions: {},
  base({ size }) {
    const r = (size * Math.sqrt(3)) / 3; // base radius
    const s = size;
    const h = (size * Math.sqrt(6)) / 3; // pyramid height

    const x = s / 2;
    const y = -r / 2;

    return polyhedron({
      points: [
        // Base
        /*
              0
             / \
            /   \
           1-----2
         */
        [0, r, 0], // 0
        [-x, y, 0], // 1
        [x, y, 0], // 2

        // Top point
        [0, 0, h], // 3
      ],

      faces: [
        [0, 1, 2],
        [0, 3, 1],
        [0, 2, 3],
        [1, 3, 2],
      ],

      orientation: "inward",
    });
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: "vertex", index: 1 },
          to: { type: "center" },
        },
        {
          faceIndex: 1,
          from: { type: "vertex", index: 1 },
          to: { type: "center" },
        },
        {
          faceIndex: 2,
          from: { type: "vertex", index: 0 },
          to: { type: "center" },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: "vertex", index: 0 },
          to: { type: "center" },
        },
        {
          faceIndex: 0,
          from: { type: "vertex", index: 0 },
          to: { type: "center" },
        },
        {
          faceIndex: 2,
          from: { type: "vertex", index: 1 },
          to: { type: "center" },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: "vertex", index: 2 },
          to: { type: "center" },
        },
        {
          faceIndex: 1,
          from: { type: "vertex", index: 0 },
          to: { type: "center" },
        },
        {
          faceIndex: 0,
          from: { type: "vertex", index: 1 },
          to: { type: "center" },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: "vertex", index: 2 },
          to: { type: "center" },
        },
        {
          faceIndex: 1,
          from: { type: "vertex", index: 2 },
          to: { type: "center" },
        },
        {
          faceIndex: 2,
          from: { type: "vertex", index: 2 },
          to: { type: "center" },
        },
      ],
    },
  ],
});
