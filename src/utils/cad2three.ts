import { Geom3 } from "@jscad/modeling/src/geometries/geom3";
import { BufferAttribute, BufferGeometry, Material, Matrix4 } from "three";
import { Brush } from "three-bvh-csg";

// https://codesandbox.io/s/05d3b?file=/src/csg-2-geom.js
export function cad2geometry(geom: Geom3): BufferGeometry {
  const vertices: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];

  let index = 0;

  for (const polygon of geom.polygons) {
    const localIndices: number[] = [];
    const index1 = index;

    for (const vertex of polygon.vertices) {
      vertices.push(...vertex);
      localIndices.push(index++);
      uvs.push(0, 0);
    }

    for (let i = 2; i < localIndices.length; i++) {
      const index2 = localIndices[i - 1] ?? index1 + i + 1;
      const index3 = localIndices[i] ?? index1 + i + 2;

      indices.push(index1, index2, index3);
    }
  }

  const geometry = new BufferGeometry();
  const position = new BufferAttribute(new Float32Array(vertices), 3);
  const uv = new BufferAttribute(new Float32Array(uvs), 2);

  geometry.setAttribute("position", position);
  geometry.setAttribute("uv", uv);
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

export function cad2brush<M extends Material | Material[]>(
  geom: Geom3,
  material?: M
) {
  const mesh = new Brush(cad2geometry(geom), material);

  mesh.applyMatrix4(new Matrix4().fromArray(geom.transforms));

  return mesh;
}
