import { getArrayItem } from "@/utils/getArrayItem";
import geom3 from "@jscad/modeling/src/geometries/geom3";
import { union } from "@jscad/modeling/src/operations/booleans";
import { rotateY, translateY } from "@jscad/modeling/src/operations/transforms";
import { cube, cuboid, cylinder } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

function getCylinderOffset(size: number, length: number) {
  return size / 4 + length / 2;
}

export const DieD4I = createDie({
  name: "d4i",
  defaultSize: 16,
  extraOptions: {
    length: { value: 1.4, min: 0, max: 20, step: 0.1, label: "Body length" },
    segments: { value: 24, min: 4, max: 360, step: 2, label: "Curve segments" },
  },
  base({ size, length, segments }) {
    const cylinderOffset = getCylinderOffset(size, length);
    const radius = size / 2;

    const baseCylinder = cylinder({
      height: size,
      radius,
      segments,
    });

    const baseCuboid = cuboid({ size: [size, cylinderOffset * 2, size] });

    const cylinder1 = translateY(cylinderOffset, baseCylinder);

    let cylinder2 = rotateY(Math.PI / 2, baseCylinder);
    cylinder2 = translateY(-cylinderOffset, cylinder2);

    return union(cylinder1, baseCuboid, cylinder2);
  },
  facesBase({ size, length }) {
    const cylinderOffset = getCylinderOffset(size, length);
    const baseCylinder = cube({ size });

    const cylinder1 = translateY(cylinderOffset, baseCylinder);

    let cylinder2 = rotateY(Math.PI / 2, baseCylinder);
    cylinder2 = translateY(-cylinderOffset, cylinder2);

    const polygons1 = geom3.toPolygons(cylinder1);
    const polygons2 = geom3.toPolygons(cylinder2);

    return geom3.fromPoints([
      getArrayItem(polygons1, 4).vertices,
      getArrayItem(polygons1, 5).vertices,
      getArrayItem(polygons2, 4).vertices,
      getArrayItem(polygons2, 5).vertices,
    ]);
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: "edge", index: 3 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: "edge", index: 1 },
          to: { type: "edge", index: 3 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 2,
          from: { type: "edge", index: 0 },
          to: { type: "edge", index: 2 },
        },
      ],
    },

    // Face 4
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
});
