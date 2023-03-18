import { createDie, DieOptions } from "../createDie";
import { icosahedron } from "../primitives/icosahedron";

export function createD20(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d20",
      defaultSize: 16,
      faceScale: 0.5,
      faces: [
        // 1
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
        // 2
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
        // 3
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
        // 4
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
        // 5
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
        // 6
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
        // 7
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
        // 8
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
        // 9
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
        // 10
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
        // 11
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
        // 12
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
        // 13
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
        // 14
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
        // 15
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
        // 16
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
        // 17
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
        // 18
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
        // 19
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
        // 20
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
      extraOptions() {
        return {};
      },
      base({ size }) {
        return icosahedron(size());
      },
    },
    options
  );
}
