import { poly3 } from "@jscad/modeling/src/geometries";
import geom3 from "@jscad/modeling/src/geometries/geom3";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { plane } from "@jscad/modeling/src/maths";
import { rotateX } from "@jscad/modeling/src/maths/mat4";
import vec3 from "@jscad/modeling/src/maths/vec3";
import { Vector3 } from "@react-three/fiber";
import { Matrix4 } from "three";
import { Decomposition, decompose } from "../decompose";
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
  center: Vector3;
  length: number;
  rotationMatrix: Decomposition;
}

export function getInstanceFaceInfo(
  geom: Geom3,
  config: InstanceFaceConfig,
  invertRotation?: boolean
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

  let rotationMat = lookAt(to, center, normal);
  rotationMat = rotateX(rotationMat, rotationMat, -Math.PI / 2);

  const rotationMatrix = new Matrix4().fromArray(rotationMat);

  if (invertRotation) rotationMatrix.invert();

  return {
    center,
    length,
    rotationMatrix: decompose(rotationMatrix),
  };
}
