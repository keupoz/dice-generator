import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { rhombicDodecahedron } from "@/utils/shapes/rhombicDodecahedron";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d12r";

export const DieD12R: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16, 0.6);

  const geom = useMemo(() => {
    return rhombicDodecahedron(size / 2);
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
      faceIndex: 11,
      from: { type: "vertex", index: 0 },
      to: { type: "vertex", index: 2 },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 9,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 4,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_5: DieFaceConfig = {
  instances: [
    {
      faceIndex: 5,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_6: DieFaceConfig = {
  instances: [
    {
      faceIndex: 10,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_7: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_8: DieFaceConfig = {
  instances: [
    {
      faceIndex: 2,
      from: { type: "vertex", index: 0 },
      to: { type: "vertex", index: 2 },
    },
  ],
};

const FACE_9: DieFaceConfig = {
  instances: [
    {
      faceIndex: 6,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_10: DieFaceConfig = {
  instances: [
    {
      faceIndex: 7,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_11: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "vertex", index: 2 },
      to: { type: "vertex", index: 0 },
    },
  ],
};

const FACE_12: DieFaceConfig = {
  instances: [
    {
      faceIndex: 8,
      from: { type: "vertex", index: 0 },
      to: { type: "vertex", index: 2 },
    },
  ],
};
