import { Vector2 } from "three";

const EPSILON = 1e-6;

export function isPointInside(points: Vector2[], p: Vector2): boolean {
  let count = 0;
  let curr = points[points.length - 1] ?? new Vector2();

  for (const next of points) {
    let p0 = next;
    let p1 = curr;

    if (curr.y < next.y) {
      p0 = curr;
      p1 = next;
    }

    if (p0.y < p.y + EPSILON && p1.y > p.y + EPSILON) {
      if ((p1.x - p0.x) * (p.y - p0.y) > (p.x - p0.x) * (p1.y - p0.y)) {
        count++;
      }
    }

    curr = next;
  }

  return count % 2 !== 0;
}
