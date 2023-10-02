import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { cuboid, cylinder } from "@jscad/modeling/src/primitives";
import { useControls } from "leva";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d2";

export const DieD2: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16);

  const { height, segments } = useControls(NAME, {
    height: { value: 3, min: 1, max: 40, step: 1, label: "Height" },
    segments: { value: 24, min: 4, max: 360, step: 1, label: "Segments" },
  });

  const geom = useMemo(() => {
    return cylinder({ radius: size / 2, height, segments });
  }, [height, segments, size]);

  const facesGeom = useMemo(() => {
    return cuboid({ size: [size, size, height] });
  }, [height, size]);

  const face1 = useDieFace(NAME, 0, facesGeom, fontScale, FACE_1);
  const face2 = useDieFace(NAME, 1, facesGeom, fontScale, FACE_2);

  const faces = useMemo(() => {
    return [face1, face2];
  }, [face1, face2]);

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
      faceIndex: 4,
      from: { type: "edge", index: 0 },
      to: { type: "edge", index: 2 },
    },
  ],
};
