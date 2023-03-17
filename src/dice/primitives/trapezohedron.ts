import { d90 } from "@/utils/math";
import { Vec3 } from "@jscad/modeling/src/maths/vec3";
import { polyhedron } from "@jscad/modeling/src/primitives";

// Adapted from https://github.com/revarbat/BOSL2/blob/master/polyhedra.scad#L734
export function trapezohedron(
  faceCount: number,
  height: number,
  radius: number
) {
  if (faceCount % 2 !== 0) {
    throw new Error("Face count must be even number");
  }

  const N = faceCount / 2;
  const h = height;
  const r = radius;
  const separation = 2 * h * Math.tan(d90 / N) ** 2;

  // Points
  const z = separation / 2;
  const points: Vec3[] = [
    [0, 0, h],
    [0, 0, -h],
  ];

  // Top
  for (let i = 0; i < N; i++) {
    const angle = ((Math.PI * 2) / N) * i;

    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);

    points.push([x, y, z]);
  }

  // Bottom
  for (let i = 0; i < N; i++) {
    const angle = Math.PI / N + ((Math.PI * 2) / N) * i;

    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);

    points.push([x, y, -z]);
  }

  // Faces
  const faces: number[][] = [];

  // Top
  for (let i = 0; i < N; i++) {
    const topIndex1 = i + 2;
    const topIndex2 = i + 1 === N ? 2 : topIndex1 + 1;
    const bottomIndex = i + N + 2;

    faces.push([0, topIndex1, bottomIndex, topIndex2]);
  }

  // Bottom
  for (let i = 0; i < N; i++) {
    const bottomIndex1 = i + N + 2;
    const bottomIndex2 = i + 1 === N ? N + 2 : bottomIndex1 + 1;
    const topIndex = i + 1 === N ? 2 : i + 3;

    faces.push([1, bottomIndex2, topIndex, bottomIndex1]);
  }

  const result = polyhedron({ points, faces });

  return result;
}
