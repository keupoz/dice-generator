import { defineScaledPolyhedron } from "./defineScaledPolyhedron";

// http://dmccooey.com/polyhedra/RhombicDodecahedron.html
const C0 = (3 * Math.sqrt(2)) / 8;
const C1 = (3 * Math.sqrt(2)) / 4;

export const rhombicDodecahedron = defineScaledPolyhedron({
  circumscribedRadius: Math.sqrt(2) / 2,
  points: [
    [0.0, 0.0, C1],
    [0.0, 0.0, -C1],
    [C1, 0.0, 0.0],
    [-C1, 0.0, 0.0],
    [0.0, C1, 0.0],
    [0.0, -C1, 0.0],
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
    [6, 0, 8, 2],
    [6, 2, 7, 4],
    [6, 4, 10, 0],
    [9, 1, 7, 2],
    [9, 2, 8, 5],
    [9, 5, 13, 1],
    [11, 1, 13, 3],
    [11, 3, 10, 4],
    [11, 4, 7, 1],
    [12, 0, 10, 3],
    [12, 3, 13, 5],
    [12, 5, 8, 0],
  ],
});
