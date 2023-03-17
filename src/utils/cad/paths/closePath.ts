import { Path, ShapeUtils } from "three";
import { PathInfo } from "./PathInfo";

export function closePath(path: Path, segments: number, output: PathInfo[]) {
  path.closePath();

  const points = path.getPoints(segments);
  const area = ShapeUtils.area(points);

  if (area !== 0) {
    output.push({ points, holes: [], area });
  }

  return new Path();
}
