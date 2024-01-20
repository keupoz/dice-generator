import { icosahedron } from "@/utils/shapes/icosahedron";
import { createDie } from "./utils/createDie";

export const DieD20 = createDie({
  name: "d20",
  defaultSize: 16,
  defaultFontScale: 0.5,
  alignFaceIndex: 0,
  invertAlignMatrix: true,
  extraOptions: {},
  base({ size }) {
    return icosahedron(size / 2);
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 0,
          polygonCenter: true,
          from: { type: "vertex", index: 2 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 16,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 12,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 18,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 5
    {
      instances: [
        {
          faceIndex: 3,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 6
    {
      instances: [
        {
          faceIndex: 7,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 7
    {
      instances: [
        {
          faceIndex: 1,
          polygonCenter: true,
          from: { type: "vertex", index: 2 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 8
    {
      instances: [
        {
          faceIndex: 5,
          polygonCenter: true,
          from: { type: "vertex", index: 2 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 9
    {
      instances: [
        {
          faceIndex: 10,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 10
    {
      instances: [
        {
          faceIndex: 14,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 11
    {
      instances: [
        {
          faceIndex: 19,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 12
    {
      instances: [
        {
          faceIndex: 15,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 13
    {
      instances: [
        {
          faceIndex: 4,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 14
    {
      instances: [
        {
          faceIndex: 8,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 15
    {
      instances: [
        {
          faceIndex: 2,
          polygonCenter: true,
          from: { type: "vertex", index: 2 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 16
    {
      instances: [
        {
          faceIndex: 6,
          polygonCenter: true,
          from: { type: "vertex", index: 2 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 17
    {
      instances: [
        {
          faceIndex: 13,
          polygonCenter: true,
          from: { type: "vertex", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 18
    {
      instances: [
        {
          faceIndex: 17,
          polygonCenter: true,
          from: { type: "vertex", index: 2 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 19
    {
      instances: [
        {
          faceIndex: 11,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 20
    {
      instances: [
        {
          faceIndex: 9,
          polygonCenter: true,
          from: { type: "vertex", index: 1 },
          to: { type: "edge", index: 0 },
        },
      ],
    },
  ],
});
