import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { union } from "@jscad/modeling/src/operations/booleans";
import { rotateY, translateY } from "@jscad/modeling/src/operations/transforms";
import { cube, cuboid, ellipsoid } from "@jscad/modeling/src/primitives";
import { useControls } from "leva";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d4c";

export const DieD4C: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 14);

  const { length, pointLength } = useControls(NAME, {
    length: { value: 21, min: 1, max: 40, label: "Body length" },
    pointLength: { value: 7, min: 1, max: 20, label: "Point length" },
  });

  const geom = useMemo(() => {
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
  }, [length, pointLength, size]);

  const facesGeom = useMemo(() => {
    return cube({ size });
  }, [size]);

  const face1 = useDieFace(NAME, 0, facesGeom, fontScale, FACE_1);
  const face2 = useDieFace(NAME, 1, facesGeom, fontScale, FACE_2);
  const face3 = useDieFace(NAME, 2, facesGeom, fontScale, FACE_3);
  const face4 = useDieFace(NAME, 3, facesGeom, fontScale, FACE_4);

  const faces = useMemo(() => {
    return [face1, face2, face3, face4];
  }, [face1, face2, face3, face4]);

  return <FinalDie ref={exportRef} geom={geom} faces={faces} hidden={hidden} />;
};

const FACE_1: DieFaceConfig = {
  instances: [
    {
      faceIndex: 5,
      from: { type: "edge", index: 3 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "edge", index: 3 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      from: { type: "edge", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 4,
      from: { type: "edge", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};
