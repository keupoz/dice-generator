import { createSlider } from "@/hooks/controls/createSlider";
import { getArrayItem } from "@/utils/getArrayItem";
import { d90 } from "@/utils/math";
import geom3 from "@jscad/modeling/src/geometries/geom3";
import { union } from "@jscad/modeling/src/operations/booleans";
import { rotateY, translateY } from "@jscad/modeling/src/operations/transforms";
import { cube, cuboid, cylinder } from "@jscad/modeling/src/primitives";
import { createMemo } from "solid-js";
import { createDie, DieOptions } from "../createDie";

export function createD4I(x: number, y: number, options: DieOptions) {
  return createDie(
    x,
    y,
    {
      name: "d4i",
      defaultSize: 16,
      faces: [
        // 1
        {
          instances: [
            {
              faceIndex: 1,
              from: { type: "edge", index: 3 },
              to: { type: "edge", index: 1 },
            },
          ],
        },
        // 2
        {
          instances: [
            {
              faceIndex: 3,
              from: { type: "edge", index: 1 },
              to: { type: "edge", index: 3 },
            },
          ],
        },
        // 3
        {
          instances: [
            {
              faceIndex: 2,
              from: { type: "edge", index: 0 },
              to: { type: "edge", index: 2 },
            },
          ],
        },
        // 4
        {
          instances: [
            {
              faceIndex: 0,
              from: { type: "edge", index: 2 },
              to: { type: "edge", index: 0 },
            },
          ],
        },
      ],
      extraOptions(folder, size) {
        const [length] = createSlider(folder, 0, 20, 0.1, 1.4, "Body length");

        const [segments] = createSlider(
          folder,
          4,
          360,
          2,
          24,
          "Curve segments"
        );

        const cylinderOffset = createMemo(() => {
          return size() / 4 + length() / 2;
        });

        return { cylinderOffset, length, segments };
      },
      base({ size, cylinderOffset, segments }) {
        const s = size();
        const radius = s / 2;
        const offset = cylinderOffset();

        const baseCylinder = cylinder({
          height: s,
          radius,
          segments: segments(),
        });
        const baseCuboid = cuboid({ size: [s, offset * 2, s] });

        const cylinder1 = translateY(offset, baseCylinder);

        let cylinder2 = rotateY(d90, baseCylinder);
        cylinder2 = translateY(-offset, cylinder2);

        return union(cylinder1, baseCuboid, cylinder2);
      },
      facesBase({ size, cylinderOffset }) {
        const offset = cylinderOffset();

        const baseCylinder = cube({ size: size() });

        const cylinder1 = translateY(offset, baseCylinder);

        let cylinder2 = rotateY(d90, baseCylinder);
        cylinder2 = translateY(-offset, cylinder2);

        const polygons1 = geom3.toPolygons(cylinder1);
        const polygons2 = geom3.toPolygons(cylinder2);

        return geom3.fromPoints([
          getArrayItem(polygons1, 4).vertices,
          getArrayItem(polygons1, 5).vertices,
          getArrayItem(polygons2, 4).vertices,
          getArrayItem(polygons2, 5).vertices,
        ]);
      },
    },
    options
  );
}
