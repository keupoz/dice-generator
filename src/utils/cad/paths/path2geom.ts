import { BufferGeometry, ExtrudeGeometry, Path, Shape } from "three";
import { PathInfo } from "./PathInfo";

export function path2geometry(depth: number, path: PathInfo): BufferGeometry {
  const shape = new Shape(path.points);

  for (const hole of path.holes) {
    shape.holes.push(new Path(hole.points));
  }

  return new ExtrudeGeometry(shape, { depth, bevelEnabled: false });
}
