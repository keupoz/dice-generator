import { PathCommand } from "opentype.js";
import { Path } from "three";

export type CommandAction<
  K extends PathCommand["type"],
  T = PathCommand & { type: K }
> = (path: Path, command: T) => void;

export const moveTo: CommandAction<"M"> = (path, { x, y }) => {
  path.moveTo(x, -y);
};

export const lineTo: CommandAction<"L"> = (path, { x, y }) => {
  path.lineTo(x, -y);
};

export const bezierCurveTo: CommandAction<"C"> = (
  path,
  { x, y, x1, y1, x2, y2 }
) => {
  path.bezierCurveTo(x1, -y1, x2, -y2, x, -y);
};

export const quadraticCurveTo: CommandAction<"Q"> = (
  path,
  { x, y, x1, y1 }
) => {
  path.quadraticCurveTo(x1, -y1, x, -y);
};
