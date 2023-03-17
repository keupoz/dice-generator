import { BufferedGeom3, isBufferedGeom3 } from "@/BufferedGeom3";
import type { Geom3 } from "@jscad/modeling/src/geometries/types";
import {
  BufferAttribute,
  BufferGeometry,
  Material,
  Matrix4,
  Mesh,
} from "three";

// https://codesandbox.io/s/05d3b?file=/src/csg-2-geom.js
export function cad2geometry(geom: Geom3): BufferGeometry {
  if (isBufferedGeom3(geom)) {
    return geom.polygons.buffer;
  }

  const vertices: number[] = [];
  const indices: number[] = [];

  let index = 0;

  for (const polygon of geom.polygons) {
    const localIndices: number[] = [];
    const index1 = index;

    for (const vertex of polygon.vertices) {
      vertices.push(...vertex);
      localIndices.push(index++);
    }

    for (let i = 2; i < localIndices.length; i++) {
      const index2 = localIndices[i - 1] ?? index1 + i + 1;
      const index3 = localIndices[i] ?? index1 + i + 2;

      indices.push(index1, index2, index3);
    }
  }

  const geometry = new BufferGeometry();
  const position = new BufferAttribute(new Float32Array(vertices), 3);

  geometry.setAttribute("position", position);
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  (geom as BufferedGeom3).polygons.buffer = geometry;

  return geometry;
}

export function cad2mesh<M extends Material | Material[]>(
  geom: Geom3,
  material: M
) {
  const mesh = new Mesh(cad2geometry(geom), material);

  mesh.applyMatrix4(new Matrix4().fromArray(geom.transforms));
  mesh.layers.mask = 0b11;

  return mesh;
}
