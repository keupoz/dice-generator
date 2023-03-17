import { PathCommand } from "opentype.js";
import { Path } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { closePath } from "./closePath";
import { bezierCurveTo, lineTo, moveTo, quadraticCurveTo } from "./commands";
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
    switch (command.type) {
      case "M":
        moveTo(path, command);
        break;
      case "L":
        lineTo(path, command);
        break;
      case "C":
        bezierCurveTo(path, command);
        break;
      case "Q":
        quadraticCurveTo(path, command);
        break;
      case "Z":
        path = closePath(path, segments, paths);
        continue;
    }
  }

  const sortedPaths = sortPaths(paths);
  const geometries = sortedPaths.map(path2geometry.bind(null, depth));

  return mergeBufferGeometries(geometries);
}
