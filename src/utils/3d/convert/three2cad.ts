import { BufferedGeom3 } from "@/BufferedGeom3";
import type { Geom3 } from "@jscad/modeling/src/geometries/types";
import type { Vec3 } from "@jscad/modeling/src/maths/types";
import { polyhedron } from "@jscad/modeling/src/primitives";
import type { BufferGeometry, Mesh } from "three";

export function geometry2cad(geometry: BufferGeometry): BufferedGeom3 {
  const points: Vec3[] = [];
  const faces: number[][] = [];
  const position = geometry.getAttribute("position");

  for (let i = 0; i < position.count; i++) {
    points.push([position.getX(i), position.getY(i), position.getZ(i)]);
  }

  if (geometry.index === null) {
    for (let i = 0; i < position.count; i += 3) {
      faces.push([i, i + 1, i + 2]);
    }
  } else {
    for (let i = 0; i < geometry.index.count; i += 3) {
      faces.push([
        geometry.index.getX(i),
        geometry.index.getX(i + 1),
        geometry.index.getX(i + 2),
      ]);
    }
  }

  const geom = polyhedron({ points, faces }) as BufferedGeom3;

  geom.polygons.buffer = geometry;

  return geom;
}

export function mesh2cad(mesh: Mesh): Geom3 {
  const geom = geometry2cad(mesh.geometry);

  mesh.updateWorldMatrix(true, true);
  geom.transforms = mesh.matrixWorld.toArray();

  return geom;
}
