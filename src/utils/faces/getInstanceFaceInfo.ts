import { poly3 } from "@jscad/modeling/src/geometries";
import geom3 from "@jscad/modeling/src/geometries/geom3";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { plane } from "@jscad/modeling/src/maths";
import { rotateX } from "@jscad/modeling/src/maths/mat4";
import { Mat4 } from "@jscad/modeling/src/maths/types";
import vec3, { Vec3 } from "@jscad/modeling/src/maths/vec3";
import { getArrayItem } from "../getArrayItem";
import { centerOfMassOfEdges } from "./centerOfMassOfEdges";
import { FaceTarget, getTargetPoint } from "./getFaceTarget";
import { lookAt } from "./lookAt";

export interface InstanceFaceConfig {
  faceIndex: number;
  polygonCenter?: boolean;
  from: FaceTarget;
  to: FaceTarget;
  t?: number;
}

export interface InstanceFace {
  center: Vec3;
  length: number;
  rotationMatrix: Mat4;
}

export function getInstanceFaceInfo(
  geom: Geom3,
  config: InstanceFaceConfig
): InstanceFace {
  const polygon = getArrayItem(geom3.toPolygons(geom), config.faceIndex);

  const points = poly3.toPoints(polygon);
  const [x, y, z] = plane.fromPoints(plane.create(), ...points);

  const normal = vec3.fromValues(x, y, z);

  const from = getTargetPoint(points, config.from);
  const to = getTargetPoint(points, config.to);

  let center;

  if (config.polygonCenter) {
    center = centerOfMassOfEdges(points);
  } else {
    center = vec3.lerp(vec3.create(), from, to, config.t ?? 0.5);
  }

  const length = vec3.distance(from, to);

  let rotationMatrix = lookAt(to, center, normal);
  rotationMatrix = rotateX(rotationMatrix, rotationMatrix, -Math.PI / 2);

  return { center, length, rotationMatrix };
}
