import { getArrayItem } from "@/utils/getArrayItem";
import { getFirstItem } from "@/utils/getFirstItem";
import ClipperShape, { Point, PointLower } from "@doodle3d/clipper-js";
import { Path, Shape, ShapeUtils, Vector2 } from "three";

export function simplifyPaths(paths: Path[], segments: number) {
  const clipperShape = paths2clipper(paths, segments);
  const simplified = clipperShape.simplify("pftNonZero");

  let shapePoints = mapPoints(getFirstItem(simplified.paths));
  const isCCW = ShapeUtils.isClockWise(shapePoints);

  if (isCCW) {
    simplified.paths.reverse();
    simplified.paths.forEach((path) => path.reverse());

    shapePoints = mapPoints(getFirstItem(simplified.paths));
  }

  const result = new Shape(shapePoints);

  for (let i = 1; i < simplified.paths.length; i++) {
    const points = getArrayItem(simplified.paths, i);
    const path = new Path(mapPoints(points));

    result.holes.push(path);
  }

  return result;
}

function paths2clipper(paths: Path[], segments: number) {
  const points: PointLower[][] = [];

  for (const path of paths) {
    points.push(path.getPoints(segments));
  }

  return new ClipperShape(points, true, true, false, false);
}

function mapPoints(points: Point[]) {
  const result = points.map(({ X, Y }) => new Vector2(X, Y));

  result.push(getArrayItem(result, -1).clone());

  return result;
}
