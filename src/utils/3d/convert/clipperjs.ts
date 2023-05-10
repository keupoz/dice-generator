import { getArrayItem } from "@/utils/getArrayItem";
import { getFirstItem } from "@/utils/getFirstItem";
import ClipperShape, { Point, PointLower } from "@doodle3d/clipper-js";
import { Path, Shape, Vector2 } from "three";

export function paths2clipper(paths: Path[], segments: number) {
  const result: PointLower[][] = [];

  for (const path of paths) {
    result.push(path.getPoints(segments));
  }

  return new ClipperShape(result, true, true, false, true);
}

export function simplifyPaths(paths: Path[], segments: number) {
  const clipperShape = paths2clipper(paths, segments);
  const simplified = clipperShape.simplify("pftNonZero");
  const result = new Shape();

  result.setFromPoints(mapPoints(getFirstItem(simplified.paths)));

  for (let i = 1; i < simplified.paths.length; i++) {
    const points = getArrayItem(simplified.paths, i);
    const path = new Path(mapPoints(points));

    result.holes.push(path);
  }

  return result;
}

function mapPoints(points: Point[]) {
  const result = points.map(({ X, Y }) => new Vector2(X, Y));

  result.push(getArrayItem(result, -1).clone());

  return result;
}
