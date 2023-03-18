import { createDie, DieOptions } from "../createDie";
import { dodecahedron } from "../primitives/dodecahedron";

export function createD12(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d12",
      defaultSize: 16,
      faceScale: 0.6,
      faces: [
        // 1
        {
          instances: [
            {
              faceIndex: 8,
              polygonCenter: true,
              from: { type: "vertex", index: 2 },
              to: { type: "edge", index: 0 },
            },
          ],
        },
        // 2
        {
          instances: [
            {
              faceIndex: 7,
              polygonCenter: true,
              from: { type: "vertex", index: 2 },
              to: { type: "edge", index: 0 },
            },
          ],
        },
        // 3
        {
          instances: [
            {
              faceIndex: 4,
              polygonCenter: true,
              from: { type: "vertex", index: 4 },
              to: { type: "edge", index: 2 },
            },
          ],
        },
        // 4
        {
          instances: [
            {
              faceIndex: 6,
              polygonCenter: true,
              from: { type: "vertex", index: 3 },
              to: { type: "edge", index: 1 },
            },
          ],
        },
        // 5
        {
          instances: [
            {
              faceIndex: 2,
              polygonCenter: true,
              from: { type: "vertex", index: 1 },
              to: { type: "edge", index: 4 },
            },
          ],
        },
        // 6
        {
          instances: [
            {
              faceIndex: 5,
              polygonCenter: true,
              from: { type: "vertex", index: 0 },
              to: { type: "edge", index: 3 },
            },
          ],
        },
        // 7
        {
          instances: [
            {
              faceIndex: 10,
              polygonCenter: true,
              from: { type: "vertex", index: 3 },
              to: { type: "edge", index: 1 },
            },
          ],
        },
        // 8
        {
          instances: [
            {
              faceIndex: 11,
              polygonCenter: true,
              from: { type: "vertex", index: 2 },
              to: { type: "edge", index: 0 },
            },
          ],
        },
        // 9
        {
          instances: [
            {
              faceIndex: 1,
              polygonCenter: true,
              from: { type: "vertex", index: 0 },
              to: { type: "edge", index: 3 },
            },
          ],
        },
        // 10
        {
          instances: [
            {
              faceIndex: 0,
              polygonCenter: true,
              from: { type: "vertex", index: 4 },
              to: { type: "edge", index: 2 },
            },
          ],
        },
        // 11
        {
          instances: [
            {
              faceIndex: 3,
              polygonCenter: true,
              from: { type: "vertex", index: 1 },
              to: { type: "edge", index: 4 },
            },
          ],
        },
        // 12
        {
          instances: [
            {
              faceIndex: 9,
              polygonCenter: true,
              from: { type: "vertex", index: 1 },
              to: { type: "edge", index: 4 },
            },
          ],
        },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return dodecahedron(size() / 2);
      },
    },
    options
  );
}
