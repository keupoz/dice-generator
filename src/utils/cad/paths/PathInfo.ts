import { Vector2 } from "three";

export interface PathInfo {
  points: Vector2[];
  holes: PathInfo[];
  area: number;
}
