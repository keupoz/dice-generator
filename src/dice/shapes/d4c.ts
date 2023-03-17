import { createSlider } from "@/hooks/controls/createSlider";
import { union } from "@jscad/modeling/src/operations/booleans";
import { rotateY, translateY } from "@jscad/modeling/src/operations/transforms";
import { cube, cuboid, ellipsoid } from "@jscad/modeling/src/primitives";
import { createDie, DieOptions } from "../createDie";

export function createD4C(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d4c",
      defaultSize: 14,
      faces: [
        // 1
        { faceIndex: 5, target: { type: "edge", index: 1 } },
        // 2
        { faceIndex: 0, target: { type: "edge", index: 1 } },
        // 3
        { faceIndex: 1, target: { type: "edge", index: 0 } },
        // 4
        { faceIndex: 4, target: { type: "edge", index: 0 } },
      ],
      extraOptions(folder) {
        const [length] = createSlider(folder, 1, 40, 1, 21, "Body length");
        const [pointLength] = createSlider(folder, 1, 20, 1, 7, "Point length");

        return { length, pointLength };
      },
      base({ size, length, pointLength }) {
        const radius = (size() / 2) * Math.SQRT2;

        let pointEllipsoid, base;

        pointEllipsoid = ellipsoid({
          radius: [radius, pointLength(), radius],
          segments: 4,
        });
        pointEllipsoid = rotateY(Math.PI / 4, pointEllipsoid);

        base = cuboid({ size: [size(), length(), size()] });
        base = union(base, translateY(-length() / 2, pointEllipsoid));
        base = union(base, translateY(length() / 2, pointEllipsoid));

        return base;
      },
      facesBase({ size }) {
        return cube({ size: size() });
      },
    },
    options
  );
}
