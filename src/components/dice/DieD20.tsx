import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { icosahedron } from "@/utils/shapes/icosahedron";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d20";

export const DieD20: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16, 0.5);

  const geom = useMemo(() => {
    return icosahedron(size / 2);
  }, [size]);

  const face1 = useDieFace(NAME, 0, geom, fontScale, FACE_1);
  const face2 = useDieFace(NAME, 1, geom, fontScale, FACE_2);
  const face3 = useDieFace(NAME, 2, geom, fontScale, FACE_3);
  const face4 = useDieFace(NAME, 3, geom, fontScale, FACE_4);
  const face5 = useDieFace(NAME, 4, geom, fontScale, FACE_5);
  const face6 = useDieFace(NAME, 5, geom, fontScale, FACE_6);
  const face7 = useDieFace(NAME, 6, geom, fontScale, FACE_7);
  const face8 = useDieFace(NAME, 7, geom, fontScale, FACE_8);
  const face9 = useDieFace(NAME, 8, geom, fontScale, FACE_9);
  const face10 = useDieFace(NAME, 9, geom, fontScale, FACE_10);
  const face11 = useDieFace(NAME, 10, geom, fontScale, FACE_11);
  const face12 = useDieFace(NAME, 11, geom, fontScale, FACE_12);
  const face13 = useDieFace(NAME, 12, geom, fontScale, FACE_13);
  const face14 = useDieFace(NAME, 13, geom, fontScale, FACE_14);
  const face15 = useDieFace(NAME, 14, geom, fontScale, FACE_15);
  const face16 = useDieFace(NAME, 15, geom, fontScale, FACE_16);
  const face17 = useDieFace(NAME, 16, geom, fontScale, FACE_17);
  const face18 = useDieFace(NAME, 17, geom, fontScale, FACE_18);
  const face19 = useDieFace(NAME, 18, geom, fontScale, FACE_19);
  const face20 = useDieFace(NAME, 19, geom, fontScale, FACE_20);

  const faces = useMemo(() => {
    return [
      face1,
      face2,
      face3,
      face4,
      face5,
      face6,
      face7,
      face8,
      face9,
      face10,
      face11,
      face12,
      face13,
      face14,
      face15,
      face16,
      face17,
      face18,
      face19,
      face20,
    ];
  }, [
    face1,
    face10,
    face11,
    face12,
    face13,
    face14,
    face15,
    face16,
    face17,
    face18,
    face19,
    face2,
    face20,
    face3,
    face4,
    face5,
    face6,
    face7,
    face8,
    face9,
  ]);

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
      faceIndex: 0,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 16,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 12,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 18,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_5: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_6: DieFaceConfig = {
  instances: [
    {
      faceIndex: 7,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_7: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_8: DieFaceConfig = {
  instances: [
    {
      faceIndex: 5,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_9: DieFaceConfig = {
  instances: [
    {
      faceIndex: 10,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_10: DieFaceConfig = {
  instances: [
    {
      faceIndex: 14,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_11: DieFaceConfig = {
  instances: [
    {
      faceIndex: 19,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_12: DieFaceConfig = {
  instances: [
    {
      faceIndex: 15,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_13: DieFaceConfig = {
  instances: [
    {
      faceIndex: 4,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_14: DieFaceConfig = {
  instances: [
    {
      faceIndex: 8,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_15: DieFaceConfig = {
  instances: [
    {
      faceIndex: 2,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_16: DieFaceConfig = {
  instances: [
    {
      faceIndex: 6,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_17: DieFaceConfig = {
  instances: [
    {
      faceIndex: 13,
      polygonCenter: true,
      from: { type: "vertex", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};

const FACE_18: DieFaceConfig = {
  instances: [
    {
      faceIndex: 17,
      polygonCenter: true,
      from: { type: "vertex", index: 2 },
      to: { type: "edge", index: 1 },
    },
  ],
};

const FACE_19: DieFaceConfig = {
  instances: [
    {
      faceIndex: 11,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};

const FACE_20: DieFaceConfig = {
  instances: [
    {
      faceIndex: 9,
      polygonCenter: true,
      from: { type: "vertex", index: 1 },
      to: { type: "edge", index: 0 },
    },
  ],
};
