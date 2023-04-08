import geom2, { Geom2 } from "@jscad/modeling/src/geometries/geom2";
import path2 from "@jscad/modeling/src/geometries/path2";
import { subtract, union } from "@jscad/modeling/src/operations/booleans";
import { extrudeLinear } from "@jscad/modeling/src/operations/extrusions";
import { Polygon } from "./Polygon";

export function polygons2geom(polygons: Polygon[]) {
  const geoms: Geom2[] = [];
  const holes: Geom2[] = [];

  for (const polygon of polygons) {
    const geom = geom2.fromPoints(path2.toPoints(polygon.path));

    geoms.push(geom);
    holes.push(
      ...polygon.holes.map((hole) => {
        return geom2.fromPoints(path2.toPoints(hole.path).reverse());
      })
    );
  }

  const finalGeom = subtract(union(geoms), holes);

  return extrudeLinear({ height: 2 }, finalGeom);
}
