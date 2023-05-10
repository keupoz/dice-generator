import { simplifyPaths } from "@/utils/3d/convert/clipperjs";
import { getArrayItem } from "@/utils/getArrayItem";
import { PathCommand } from "fontkit";
import { ExtrudeGeometry, Path, Shape } from "three";

export function parsePathCommands(
  glyphs: PathCommand[][],
  segments: number,
  depth: number
) {
  const shapes: Shape[] = [];

  for (const commands of glyphs) {
    const glyphPaths: Path[] = [];
    let path = new Path();

    glyphPaths.push(path);

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
          path = new Path();
          glyphPaths.push(path);
        }
      }
    }

    const shape = simplifyPaths(glyphPaths, segments);
    shapes.push(shape);
  }

  return new ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: false,
  });
}
