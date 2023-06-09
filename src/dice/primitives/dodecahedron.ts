import { defineScaledPolyhedron } from "./defineScaledPolyhedron";

// http://dmccooey.com/polyhedra/Dodecahedron.html
const C0 = (1 + Math.sqrt(5)) / 4;
const C1 = (3 + Math.sqrt(5)) / 4;

export const dodecahedron = defineScaledPolyhedron({
  points: [
    [0.0, 0.5, C1],
    [0.0, 0.5, -C1],
    [0.0, -0.5, C1],
    [0.0, -0.5, -C1],
    [C1, 0.0, 0.5],
    [C1, 0.0, -0.5],
    [-C1, 0.0, 0.5],
    [-C1, 0.0, -0.5],
    [0.5, C1, 0.0],
    [0.5, -C1, 0.0],
    [-0.5, C1, 0.0],
    [-0.5, -C1, 0.0],
    [C0, C0, C0],
    [C0, C0, -C0],
    [C0, -C0, C0],
    [C0, -C0, -C0],
    [-C0, C0, C0],
    [-C0, C0, -C0],
    [-C0, -C0, C0],
    [-C0, -C0, -C0],
  ],
  faces: [
    [0, 2, 14, 4, 12],
    [0, 12, 8, 10, 16],
    [0, 16, 6, 18, 2],
    [7, 6, 16, 10, 17],
    [7, 17, 1, 3, 19],
    [7, 19, 11, 18, 6],
    [9, 11, 19, 3, 15],
    [9, 15, 5, 4, 14],
    [9, 14, 2, 18, 11],
    [13, 1, 17, 10, 8],
    [13, 8, 12, 4, 5],
    [13, 5, 15, 3, 1],
  ],
});
