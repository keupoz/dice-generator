import { union } from "@jscad/modeling/src/operations/booleans";
import { rotateY, translateY } from "@jscad/modeling/src/operations/transforms";
import { cube, cuboid, ellipsoid } from "@jscad/modeling/src/primitives";
import { createDie } from "./utils/createDie";

export const DieD4C = createDie({
  name: "d4c",
  defaultSize: 14,
  extraOptions: {
    length: { value: 21, min: 1, max: 40, step: 1, label: "Body length" },
    pointLength: { value: 7, min: 1, max: 20, step: 1, label: "Point length" },
  },
  base({ size, length, pointLength }) {
    const radius = (size / 2) * Math.SQRT2;

    let pointEllipsoid, base;

    pointEllipsoid = ellipsoid({
      radius: [radius, pointLength, radius],
      segments: 4,
    });
    pointEllipsoid = rotateY(Math.PI / 4, pointEllipsoid);

    base = cuboid({ size: [size, length, size] });
    base = union(base, translateY(-length / 2, pointEllipsoid));
    base = union(base, translateY(length / 2, pointEllipsoid));

    return base;
  },
  facesBase({ size }) {
    return cube({ size });
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 5,
          from: { type: "edge", index: 3 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: "edge", index: 3 },
          to: { type: "edge", index: 1 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: "edge", index: 2 },
          to: { type: "edge", index: 0 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 4,
          from: { type: "edge", index: 2 },
          to: { type: "edge", index: 0 },
        },
      ],
    },
  ],
});
