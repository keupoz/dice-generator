import { defineScaledPolyhedron } from "./defineScaledPolyhedron";

// http://dmccooey.com/polyhedra/Icosahedron.html
const C0 = (1 + Math.sqrt(5)) / 4;

export const icosahedron = defineScaledPolyhedron({
  points: [
    [0.5, 0.0, C0],
    [0.5, 0.0, -C0],
    [-0.5, 0.0, C0],
    [-0.5, 0.0, -C0],
    [C0, 0.5, 0.0],
    [C0, -0.5, 0.0],
    [-C0, 0.5, 0.0],
    [-C0, -0.5, 0.0],
    [0.0, C0, 0.5],
    [0.0, C0, -0.5],
    [0.0, -C0, 0.5],
    [0.0, -C0, -0.5],
  ],
  faces: [
    [0, 2, 10],
    [0, 10, 5],
    [0, 5, 4],
    [0, 4, 8],
    [0, 8, 2],
    [3, 1, 11],
    [3, 11, 7],
    [3, 7, 6],
    [3, 6, 9],
    [3, 9, 1],
    [2, 6, 7],
    [2, 7, 10],
    [10, 7, 11],
    [10, 11, 5],
    [5, 11, 1],
    [5, 1, 4],
    [4, 1, 9],
    [4, 9, 8],
    [8, 9, 6],
    [8, 6, 2],
  ],
});
