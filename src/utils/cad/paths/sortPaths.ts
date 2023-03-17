import { isPointInside } from "./isPointInside";
import { PathInfo } from "./PathInfo";

export function sortPaths(paths: PathInfo[]): PathInfo[] {
  paths.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));

  const root: PathInfo[] = [];

  for (let i = 0; i < paths.length; i++) {
    let parent;

    for (let j = i - 1; j >= 0; j--) {
      const pi = paths[i];
      const pj = paths[j];

      if (pi === undefined || pj === undefined) {
        throw new Error(`Undefined paths at ${i} and ${j}`);
      }

      const point = pi.points[0];

      if (point === undefined) {
        throw new Error(`Empty path at ${i}`);
      }

      if (isPointInside(pj.points, point) && pi.area * pj.area < 0) {
        parent = pj;
        break;
      }
    }

    const pi = paths[i];

    if (pi === undefined) continue;

    if (parent === undefined) {
      root.push(pi);
    } else {
      parent.holes.push(pi);
    }
  }

  for (const path of root) {
    if (path.area < 0) {
      path.points.reverse();
      path.holes.forEach((path) => path.points.reverse());
    }
  }

  return root;
}
