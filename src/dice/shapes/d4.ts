import { polyhedron } from "@jscad/modeling/src/primitives";
import { createMemo } from "solid-js";
import { createDie, DieOptions } from "../createDie";

export function createD4(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d4",
      defaultSize: 16,
      faceScale: 0.5,
      faces: [
        // 1
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
        // 2
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
        // 3
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
        // 4
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
      extraOptions(_folder, size) {
        const baseRadius = createMemo(() => {
          return (size() * Math.sqrt(3)) / 3;
        });

        const pyramidHeight = createMemo(() => {
          return (size() * Math.sqrt(6)) / 3;
        });

        return {
          baseRadius,
          pyramidHeight,
        };
      },
      base({ size, baseRadius, pyramidHeight }) {
        const r = baseRadius();
        const s = size();
        const h = pyramidHeight();

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
    },
    options
  );
}
