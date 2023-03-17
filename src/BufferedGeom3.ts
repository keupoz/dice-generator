import { Geom3 } from "@jscad/modeling/src/geometries/geom3";
import { Poly3 } from "@jscad/modeling/src/geometries/poly3";
import { BufferGeometry } from "three";

export interface BufferedGeom3 extends Geom3 {
  polygons: Poly3[] & { buffer: BufferGeometry };
}

export function isBufferedGeom3(geom: Geom3): geom is BufferedGeom3 {
  return (
    "buffer" in geom.polygons && geom.polygons.buffer instanceof BufferGeometry
  );
}
