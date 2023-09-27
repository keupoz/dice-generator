import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { cube } from "@jscad/modeling/src/primitives";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d6";

export const DieD6: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16);

  const geom = useMemo(() => {
    return cube({ size });
  }, [size]);

  const faces = [
    useDieFace(NAME, 0, geom, fontScale, FACE_1),
    useDieFace(NAME, 1, geom, fontScale, FACE_2),
    useDieFace(NAME, 2, geom, fontScale, FACE_3),
    useDieFace(NAME, 3, geom, fontScale, FACE_4),
    useDieFace(NAME, 4, geom, fontScale, FACE_5),
    useDieFace(NAME, 5, geom, fontScale, FACE_6),
  ];

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
      faceIndex: 2,
      from: { type: "edge", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      from: { type: "edge", index: 1 },
      to: { type: "edge", index: 3 },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "edge", index: 1 },
      to: { type: "edge", index: 3 },
    },
  ],
};

const FACE_5: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "edge", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_6: DieFaceConfig = {
  instances: [
    {
      faceIndex: 4,
      from: { type: "edge", index: 3 },
      to: { type: "edge", index: 1 },
    },
  ],
};
