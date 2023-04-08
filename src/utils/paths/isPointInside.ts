import { Vec2 } from "@jscad/modeling/src/maths/types";
import { getArrayItem } from "../getArrayItem";

const EPSILON = 1e-6;

export function isPointInside(points: Vec2[], p: Vec2): boolean {
  let count = 0;
  let curr = getArrayItem(points, -1);

  for (const next of points) {
    let p0 = next;
    let p1 = curr;

    if (curr[1] < next[1]) {
      p0 = curr;
      p1 = next;
    }

    if (p0[1] < p[1] + EPSILON && p1[1] > p[1] + EPSILON) {
      if ((p1[0] - p0[0]) * (p[1] - p0[1]) > (p[0] - p0[0]) * (p1[1] - p0[1])) {
        count++;
      }
    }

    curr = next;
  }

  return count % 2 !== 0;
}
