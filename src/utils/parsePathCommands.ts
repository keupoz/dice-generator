import { PathCommand } from "fontkit";
import { ExtrudeGeometry, Path, Shape } from "three";
import { simplifyPaths } from "./clipperjs";
import { getArrayItem } from "./getArrayItem";

export function parsePathCommands(
  glyphs: PathCommand[][],
  segments: number,
  depth: number
) {
  const shapes: Shape[] = [];

  for (const commands of glyphs) {
    const glyphPaths: Path[] = [];
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

        case "closePath": {
          path.closePath();
          glyphPaths.push(path);

          path = new Path();
        }
      }
    }

    const newShapes = simplifyPaths(glyphPaths, segments);
    shapes.push(...newShapes);
  }

  return new ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: false,
  });
}
