import { lookAt } from "@/utils/3d/lookAt";
import { getArrayItem } from "@/utils/getArrayItem";
import { d90 } from "@/utils/math";
import geom3, { Geom3 } from "@jscad/modeling/src/geometries/geom3";
import poly3, { Poly3 } from "@jscad/modeling/src/geometries/poly3";
import measureArea from "@jscad/modeling/src/geometries/poly3/measureArea";
import { Mat4, rotateX } from "@jscad/modeling/src/maths/mat4";
import plane from "@jscad/modeling/src/maths/plane";
import vec3, { Vec3 } from "@jscad/modeling/src/maths/vec3";
import slice from "@jscad/modeling/src/operations/extrusions/slice";

export interface GeomFace {
  area: number;
  center: Vec3;
  rotationMatrix: Mat4;
  points: Vec3[];
}

export interface FaceTarget {
  type: "edge" | "vertex";
  index: number;
}

export interface FaceCenter {
  target: FaceTarget;
  t: number;
}

const ORIGIN = vec3.create();
const UP = vec3.fromValues(0, 0, 1);

export function getFaceInfo(
  geom: Geom3,
  faceIndex: number,
  target?: FaceTarget,
  customCenter?: FaceCenter
): GeomFace {
  const polygon = getArrayItem(geom3.toPolygons(geom), faceIndex);

  const points = poly3.toPoints(polygon);
  const [x, y, z] = plane.fromPoints(plane.create(), ...points);

  const normal = vec3.fromValues(x, y, z);

  const area = measureArea(polygon);
  const faceCenter = centerOfMassOfEdges(polygon);

  let rotationMatrix;

  if (target === undefined) {
    rotationMatrix = lookAt(normal, ORIGIN, UP);
  } else {
    const targetPoint = getTargetPoint(points, target);

    rotationMatrix = lookAt(targetPoint, faceCenter, normal);
    rotationMatrix = rotateX(rotationMatrix, rotationMatrix, -d90);
  }

  let center = faceCenter;

  if (customCenter !== undefined) {
    const targetPoint = getTargetPoint(points, customCenter.target);
    center = vec3.lerp(vec3.create(), faceCenter, targetPoint, customCenter.t);

    console.log(center);
  }

  return { area, center, rotationMatrix, points };
}

export function getTargetPoint(points: Vec3[], target: FaceTarget) {
  switch (target.type) {
    case "edge": {
      const { edges } = slice.fromPoints(points);
      const edge = getArrayItem(edges, target.index);

      return vec3.lerp(vec3.create(), edge[0], edge[1], 0.5);
    }

    case "vertex": {
      return getArrayItem(points, target.index);
    }
  }
}

// https://stackoverflow.com/a/22474859
function centerOfMassOfEdges(polygon: Poly3) {
  let sx = 0;
  let sy = 0;
  let sz = 0;
  let slen = 0;

  let [x1, y1, z1] = polygon.vertices[polygon.vertices.length - 1] ?? [0, 0, 0];

  for (const [x2, y2, z2] of polygon.vertices) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dz = z2 - z1;

    const len = Math.hypot(dx, dy, dz);

    sx += ((x1 + x2) / 2) * len;
    sy += ((y1 + y2) / 2) * len;
    sz += ((z1 + z2) / 2) * len;

    slen += len;

    x1 = x2;
    y1 = y2;
    z1 = z2;
  }

  const cx = sx / slen;
  const cy = sy / slen;
  const cz = sz / slen;

  return vec3.fromValues(cx, cy, cz);
}
