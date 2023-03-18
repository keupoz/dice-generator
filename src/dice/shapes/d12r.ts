import { createDie, DieOptions } from "../createDie";
import { rhombicDodecahedron } from "../primitives/rhombicDodecahedron";

export function createD12r(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d12r",
      defaultSize: 16,
      faceScale: 0.6,
      faces: [
        // 1
        {
          instances: [
            {
              faceIndex: 11,
              from: { type: "vertex", index: 0 },
              to: { type: "vertex", index: 2 },
            },
          ],
        },
        // 2
        {
          instances: [
            {
              faceIndex: 9,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 3
        {
          instances: [
            {
              faceIndex: 4,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 4
        {
          instances: [
            {
              faceIndex: 0,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 5
        {
          instances: [
            {
              faceIndex: 5,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 6
        {
          instances: [
            {
              faceIndex: 10,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 7
        {
          instances: [
            {
              faceIndex: 1,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 8
        {
          instances: [
            {
              faceIndex: 2,
              from: { type: "vertex", index: 0 },
              to: { type: "vertex", index: 2 },
            },
          ],
        },
        // 9
        {
          instances: [
            {
              faceIndex: 6,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 10
        {
          instances: [
            {
              faceIndex: 7,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 11
        {
          instances: [
            {
              faceIndex: 3,
              from: { type: "vertex", index: 2 },
              to: { type: "vertex", index: 0 },
            },
          ],
        },
        // 12
        {
          instances: [
            {
              faceIndex: 8,
              from: { type: "vertex", index: 0 },
              to: { type: "vertex", index: 2 },
            },
          ],
        },
      ],
      extraOptions() {
        return {};
      },
      base({ size }) {
        return rhombicDodecahedron(size() / 2);
      },
    },
    options
  );
}
