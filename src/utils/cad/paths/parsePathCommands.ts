import { getArrayItem } from "@/utils/getArrayItem";
import { PathCommand } from "fontkit";
import { Path } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { closePath } from "./closePath";
import { path2geometry } from "./path2geom";
import { PathInfo } from "./PathInfo";
import { sortPaths } from "./sortPaths";

export function parsePathCommands(
  commands: PathCommand[],
  segments: number,
  depth: number
) {
  const paths: PathInfo[] = [];
  let path = new Path();

  for (const command of commands) {
    switch (command.command) {
      case "moveTo": {
        const x = getArrayItem(command.args, 0);
        const y = getArrayItem(command.args, 1);

        path.moveTo(x, y);

        break;
      }

      case "lineTo": {
        const x = getArrayItem(command.args, 0);
        const y = getArrayItem(command.args, 1);

        path.lineTo(x, y);

        break;
      }

      case "bezierCurveTo": {
        const x1 = getArrayItem(command.args, 0);
        const y1 = getArrayItem(command.args, 1);
        const x2 = getArrayItem(command.args, 2);
        const y2 = getArrayItem(command.args, 3);
        const x = getArrayItem(command.args, 4);
        const y = getArrayItem(command.args, 5);

        path.bezierCurveTo(x1, y1, x2, y2, x, y);
        break;
      }
      case "quadraticCurveTo": {
        const x1 = getArrayItem(command.args, 0);
        const y1 = getArrayItem(command.args, 1);
        const x = getArrayItem(command.args, 2);
        const y = getArrayItem(command.args, 3);

        path.quadraticCurveTo(x1, y1, x, y);
        break;
      }

      case "closePath":
        path = closePath(path, segments, paths);
        continue;
    }
  }

  const sortedPaths = sortPaths(paths);
  const geometries = sortedPaths.map(path2geometry.bind(null, depth));

  return mergeBufferGeometries(geometries);
}
