import vec3, { Vec3 } from "@jscad/modeling/src/maths/vec3";
import { getArrayItem } from "../getArrayItem";

// https://stackoverflow.com/a/22474859
export function centerOfMassOfEdges(points: Vec3[]) {
  let sx = 0;
  let sy = 0;
  let sz = 0;
  let slen = 0;

  let [x1, y1, z1] = getArrayItem(points, points.length - 1);

  for (const [x2, y2, z2] of points) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;

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
