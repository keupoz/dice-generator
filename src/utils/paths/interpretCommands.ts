import { path2 } from "@jscad/modeling/src/geometries";
import { Path2 } from "@jscad/modeling/src/geometries/types";
import { PathCommand } from "opentype.js";
import { measureArea } from "./measureArea";
import { Polygon } from "./Polygon";

export function interpretCommands(commands: PathCommand[], segments: number) {
  const polygons: Polygon[] = [];

  let path: Path2 = path2.create();

  function finalizePath(path: Path2) {
    const area = measureArea(path.points);

    if (area !== 0) {
      polygons.push({
        path,
        holes: [],
        area,
      });
    }
  }

  for (const command of commands) {
    switch (command.type) {
      case "M": {
        finalizePath(path2.close(path));
        path = path2.fromPoints({}, [[command.x, -command.y]]);
        break;
      }

      case "L": {
        path = path2.appendPoints([[command.x, -command.y]], path);
        break;
      }

      case "C": {
        path = path2.appendBezier(
          {
            controlPoints: [
              [command.x1, -command.y1],
              [command.x2, -command.y2],
              [command.x, -command.y],
            ],
            segments,
          },
          path
        );

        break;
      }

      case "Q": {
        path = path2.appendBezier(
          {
            controlPoints: [
              [command.x1, -command.y1],
              [command.x, -command.y],
            ],
            segments,
          },
          path
        );

        break;
      }

      case "Z": {
        path = path2.close(path);
        break;
      }
    }

    if (path.isClosed) {
      finalizePath(path);
      path = path2.create();
    }
  }

  return polygons;
}
