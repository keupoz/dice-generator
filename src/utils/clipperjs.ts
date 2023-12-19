import ClipperShape, { Point, PointLower } from "@doodle3d/clipper-js";
import { Path, Shape, Vector2 } from "three";
import { getArrayItem } from "./getArrayItem";
import { getFirstItem } from "./getFirstItem";

export function simplifyPaths(paths: Path[], segments: number) {
  const clipperShape = paths2clipper(paths, segments);
  const simplified = clipperShape.simplify("pftNonZero");

  const separated = simplified.separateShapes();

  const result: Shape[] = [];

  for (const separatedShape of separated) {
    const firstPath = getFirstItem(separatedShape.paths);
    const newShape = new Shape(mapPoints(firstPath));

    for (let i = 1; i < separatedShape.paths.length; i++) {
      const points = getArrayItem(separatedShape.paths, i);
      const path = new Path(mapPoints(points));

      newShape.holes.push(path);
    }

    result.push(newShape);
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

  return result;
}
