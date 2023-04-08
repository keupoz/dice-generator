import { getArrayItem } from "../getArrayItem";
import { isPointInside } from "./isPointInside";
import { Polygon } from "./Polygon";

// https://codepen.io/Anemolo/pen/jOOYmEZ?editors=0010
export function sortPolygons(polygons: Polygon[]): Polygon[] {
  polygons.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));

  const root: Polygon[] = [];

  for (let i = 0; i < polygons.length; i++) {
    let parent;

    for (let j = i - 1; j >= 0; j--) {
      const pi = getArrayItem(polygons, i);
      const pj = getArrayItem(polygons, j);

      const point = getArrayItem(pi.path.points, 0);

      if (pi.area * pj.area < 0 && isPointInside(pj.path.points, point)) {
        parent = pj;
        break;
      }
    }

    const pi = getArrayItem(polygons, i);

    if (parent === undefined) {
      root.push(pi);
    } else {
      parent.holes.push(pi);
    }
  }

  for (const polygon of root) {
    if (polygon.area < 0) {
      polygon.path.points.reverse();
      polygon.holes.forEach((polygon) => polygon.path.points.reverse());
    }
  }

  return root;
}
