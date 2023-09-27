import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { dodecahedron } from "@/utils/shapes/dodecahedron";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d12";

export const DieD12: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16, 0.6);

  const geom = useMemo(() => {
    return dodecahedron(size / 2);
  }, [size]);

  const faces = [
    useDieFace(NAME, 0, geom, fontScale, FACE_1),
    useDieFace(NAME, 1, geom, fontScale, FACE_2),
    useDieFace(NAME, 2, geom, fontScale, FACE_3),
    useDieFace(NAME, 3, geom, fontScale, FACE_4),
    useDieFace(NAME, 4, geom, fontScale, FACE_5),
    useDieFace(NAME, 5, geom, fontScale, FACE_6),
    useDieFace(NAME, 6, geom, fontScale, FACE_7),
    useDieFace(NAME, 7, geom, fontScale, FACE_8),
    useDieFace(NAME, 8, geom, fontScale, FACE_9),
    useDieFace(NAME, 9, geom, fontScale, FACE_10),
    useDieFace(NAME, 10, geom, fontScale, FACE_11),
    useDieFace(NAME, 11, geom, fontScale, FACE_12),
  ];

  return (
    <FinalDie
      ref={exportRef}
      geom={geom}
      faces={faces}
      hidden={hidden}
      alignFaceConfig={FACE_1}
      invertMatrix
    />
  );
};

const FACE_1: DieFaceConfig = {
  instances: [
    {
      faceIndex: 8,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 7,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 4,
      polygonCenter: true,
      from: { type: "vertex", index: 4 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 6,
      polygonCenter: true,
      from: { type: "vertex", index: 3 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_5: DieFaceConfig = {
  instances: [
    {
      faceIndex: 2,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 4 },
    },
  ],
};

const FACE_6: DieFaceConfig = {
  instances: [
    {
      faceIndex: 5,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 3 },
    },
  ],
};

const FACE_7: DieFaceConfig = {
  instances: [
    {
      faceIndex: 10,
      polygonCenter: true,
      from: { type: "vertex", index: 3 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_8: DieFaceConfig = {
  instances: [
    {
      faceIndex: 11,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_9: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 3 },
    },
  ],
};

const FACE_10: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      polygonCenter: true,
      from: { type: "vertex", index: 4 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_11: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 4 },
    },
  ],
};

const FACE_12: DieFaceConfig = {
  instances: [
    {
      faceIndex: 9,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 4 },
    },
  ],
};
