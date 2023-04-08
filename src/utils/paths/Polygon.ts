import { Path2 } from "@jscad/modeling/src/geometries/types";

export interface Polygon {
  path: Path2;
  holes: Polygon[];
  area: number;
}
