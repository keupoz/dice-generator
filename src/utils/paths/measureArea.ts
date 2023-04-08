import { Vec2 } from "@jscad/modeling/src/maths/types";
import { getArrayItem } from "../getArrayItem";

export function measureArea(points: Vec2[]) {
  const n = points.length;
  let area = 0;

  for (let p = n - 1, q = 0; q < n; p = q++) {
    const point1 = getArrayItem(points, p);
    const point2 = getArrayItem(points, q);

    area += point1[0] * point2[1] - point2[0] * point1[1];
  }

  return 0.5 * area;
}
