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
      faceScale: 1 / 3,
      faces: [
        {
          faceIndex: 3,
          center: { t: 0.5, target: { type: "vertex", index: 1 } },
          extraInstances: [
            {
              faceIndex: 1,
              center: { t: 0.5, target: { type: "vertex", index: 1 } },
            },
            {
              faceIndex: 2,
              center: { t: 0.5, target: { type: "vertex", index: 0 } },
            },
          ],
        },
        {
          faceIndex: 3,
          target: { type: "edge", index: 2 },
          center: { t: 0.5, target: { type: "vertex", index: 0 } },
          extraInstances: [
            {
              faceIndex: 0,
              target: { type: "edge", index: 2 },
              center: { t: 0.5, target: { type: "vertex", index: 0 } },
            },
            {
              faceIndex: 2,
              target: { type: "edge", index: 0 },
              center: { t: 0.5, target: { type: "vertex", index: 1 } },
            },
          ],
        },
        {
          faceIndex: 3,
          target: { type: "edge", index: 1 },
          center: { t: 0.5, target: { type: "vertex", index: 2 } },
          extraInstances: [
            {
              faceIndex: 0,
              target: { type: "edge", index: 0 },
              center: { t: 0.5, target: { type: "vertex", index: 1 } },
            },
            {
              faceIndex: 1,
              target: { type: "edge", index: 2 },
              center: { t: 0.5, target: { type: "vertex", index: 0 } },
            },
          ],
        },
        {
          faceIndex: 0,
          target: { type: "edge", index: 1 },
          center: { t: 0.5, target: { type: "vertex", index: 2 } },
          extraInstances: [
            {
              faceIndex: 1,
              target: { type: "edge", index: 1 },
              center: { t: 0.5, target: { type: "vertex", index: 2 } },
            },
            {
              faceIndex: 2,
              target: { type: "edge", index: 1 },
              center: { t: 0.5, target: { type: "vertex", index: 2 } },
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
