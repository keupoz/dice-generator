import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { polyhedron } from "@jscad/modeling/src/primitives";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d4";

export const DieD4: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16, 0.5);

  const geom = useMemo(() => {
    const r = (size * Math.sqrt(3)) / 3; // base radius
    const s = size;
    const h = (size * Math.sqrt(6)) / 3; // pyramid height

    const x = s / 2;
    const y = -r / 2;

    return polyhedron({
      points: [
        // Base
        /*
         0
        / \
       /   \
      1-----2
    */
        [0, r, 0], // 0
        [-x, y, 0], // 1
        [x, y, 0], // 2

        // Top point
        [0, 0, h], // 3
      ],

      faces: [
        [0, 1, 2],
        [0, 3, 1],
        [0, 2, 3],
        [1, 3, 2],
      ],

      orientation: "inward",
    });
  }, [size]);

  const face1 = useDieFace(NAME, 0, geom, fontScale, FACE_1);
  const face2 = useDieFace(NAME, 1, geom, fontScale, FACE_2);
  const face3 = useDieFace(NAME, 2, geom, fontScale, FACE_3);
  const face4 = useDieFace(NAME, 3, geom, fontScale, FACE_4);

  const faces = useMemo(() => {
    return [face1, face2, face3, face4];
  }, [face1, face2, face3, face4]);

  return <FinalDie ref={exportRef} geom={geom} faces={faces} hidden={hidden} />;
};

const FACE_1: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "vertex", index: 1 },
      to: { type: "center" },
    },
    {
      faceIndex: 1,
      from: { type: "vertex", index: 1 },
      to: { type: "center" },
    },
    {
      faceIndex: 2,
      from: { type: "vertex", index: 0 },
      to: { type: "center" },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "vertex", index: 0 },
      to: { type: "center" },
    },
    {
      faceIndex: 0,
      from: { type: "vertex", index: 0 },
      to: { type: "center" },
    },
    {
      faceIndex: 2,
      from: { type: "vertex", index: 1 },
      to: { type: "center" },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "vertex", index: 2 },
      to: { type: "center" },
    },
    {
      faceIndex: 1,
      from: { type: "vertex", index: 0 },
      to: { type: "center" },
    },
    {
      faceIndex: 0,
      from: { type: "vertex", index: 1 },
      to: { type: "center" },
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "vertex", index: 2 },
      to: { type: "center" },
    },
    {
      faceIndex: 1,
      from: { type: "vertex", index: 2 },
      to: { type: "center" },
    },
    {
      faceIndex: 2,
      from: { type: "vertex", index: 2 },
      to: { type: "center" },
    },
  ],
};
