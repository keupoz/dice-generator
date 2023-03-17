import { polyhedron } from "@jscad/modeling/src/primitives";

// http://dmccooey.com/polyhedra/Octahedron.html
export function octahedron(size: number) {
  const C0 = (Math.SQRT2 / 2) * size;

  return polyhedron({
    points: [
      [0.0, 0.0, C0],
      [0.0, 0.0, -C0],
      [C0, 0.0, 0.0],
      [-C0, 0.0, 0.0],
      [0.0, C0, 0.0],
      [0.0, -C0, 0.0],
    ],
    faces: [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 2, 5],
      [1, 5, 3],
      [1, 3, 4],
      [1, 4, 2],
    ],
  });
}
