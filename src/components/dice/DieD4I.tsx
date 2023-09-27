import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { getArrayItem } from "@/utils/getArrayItem";
import geom3 from "@jscad/modeling/src/geometries/geom3";
import { union } from "@jscad/modeling/src/operations/booleans";
import { rotateY, translateY } from "@jscad/modeling/src/operations/transforms";
import { cube, cuboid, cylinder } from "@jscad/modeling/src/primitives";
import { useControls } from "leva";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d4i";

export const DieD4I: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16);

  const { length, segments } = useControls(NAME, {
    length: { value: 1.4, min: 0, max: 20, step: 0.1, label: "Body length" },
    segments: { value: 24, min: 4, max: 360, step: 2, label: "Curve segments" },
  });

  const cylinderOffset = size / 4 + length / 2;

  const geom = useMemo(() => {
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
  }, [cylinderOffset, segments, size]);

  const facesGeom = useMemo(() => {
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
  }, [cylinderOffset, size]);

  const faces = [
    useDieFace(NAME, 0, facesGeom, fontScale, FACE_1),
    useDieFace(NAME, 1, facesGeom, fontScale, FACE_2),
    useDieFace(NAME, 2, facesGeom, fontScale, FACE_3),
    useDieFace(NAME, 3, facesGeom, fontScale, FACE_4),
  ];

  return <FinalDie ref={exportRef} geom={geom} faces={faces} hidden={hidden} />;
};

const FACE_1: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      from: { type: "edge", index: 3 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "edge", index: 1 },
      to: { type: "edge", index: 3 },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 2,
      from: { type: "edge", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "edge", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};
