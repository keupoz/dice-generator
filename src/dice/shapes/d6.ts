import { cube } from "@jscad/modeling/src/primitives";
import { createDie, DieOptions } from "../createDie";

export function createD6(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d6",
      defaultSize: 16,
      faces: [
        // 1
        {
          instances: [
            {
              faceIndex: 5,
              from: { type: "edge", index: 3 },
              to: { type: "edge", index: 1 },
            },
          ],
        },
        // 2
        {
          instances: [
            {
              faceIndex: 2,
              from: { type: "edge", index: 0 },
              to: { type: "edge", index: 2 },
            },
          ],
        },
        // 3
        {
          instances: [
            {
              faceIndex: 1,
              from: { type: "edge", index: 1 },
              to: { type: "edge", index: 3 },
            },
          ],
        },
        // 4
        {
          instances: [
            {
              faceIndex: 0,
              from: { type: "edge", index: 1 },
              to: { type: "edge", index: 3 },
            },
          ],
        },
        // 5
        {
          instances: [
            {
              faceIndex: 3,
              from: { type: "edge", index: 2 },
              to: { type: "edge", index: 0 },
            },
          ],
        },
        // 6
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
      extraOptions() {
        return {};
      },
      base({ size }) {
        return cube({ size: size() });
      },
    },
    options
  );
}
