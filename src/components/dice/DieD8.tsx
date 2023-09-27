import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { octahedron } from "@/utils/shapes/octahedron";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d8";

export const DieD8: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16, 0.6);

  const geom = useMemo(() => {
    return octahedron(size / 2);
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

function createFaceConfig(index: number): DieFaceConfig {
  return {
    instances: [
      {
        faceIndex: index,
        polygonCenter: true,
        from: { type: "vertex", index: 0 },
        to: { type: "edge", index: 2 },
      },
    ],
  };
}

const FACE_1 = createFaceConfig(0);
const FACE_2 = createFaceConfig(4);
const FACE_3 = createFaceConfig(3);
const FACE_4 = createFaceConfig(7);
const FACE_5 = createFaceConfig(2);
const FACE_6 = createFaceConfig(6);
const FACE_7 = createFaceConfig(1);
const FACE_8 = createFaceConfig(5);
