import { DEG_60 } from "@/consts";
import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { intersect } from "@jscad/modeling/src/operations/booleans";
import {
  rotateX,
  scale,
  translateZ,
} from "@jscad/modeling/src/operations/transforms";
import { cube, sphere } from "@jscad/modeling/src/primitives";
import { useControls } from "leva";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d3";

const TRIANGLE_PRISM = (() => {
  let cutter = cube({ size: 1 });
  cutter = translateZ(1 / 4, cutter);

  let result = cutter;

  result = intersect(result, cutter);
  result = intersect(result, rotateX(DEG_60 * 2, cutter));
  result = intersect(result, rotateX(-DEG_60 * 2, cutter));

  return result;
})();

export const DieD3: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 16);

  const { segments } = useControls(NAME, {
    segments: { value: 24, min: 24, max: 360, step: 1, label: "Segments" },
  });

  const basePrism = useMemo(() => {
    return scale([size, size, size], TRIANGLE_PRISM);
  }, [size]);

  const geom = useMemo(() => {
    const baseSphere = sphere({ radius: size / 2, segments });

    return intersect(basePrism, baseSphere);
  }, [basePrism, segments, size]);

  const face1 = useDieFace(NAME, 0, basePrism, fontScale, FACE_1);
  const face2 = useDieFace(NAME, 1, basePrism, fontScale, FACE_2);
  const face3 = useDieFace(NAME, 2, basePrism, fontScale, FACE_3);

  const faces = useMemo(() => {
    return [face1, face2, face3];
  }, [face1, face2, face3]);

  return <FinalDie ref={exportRef} geom={geom} faces={faces} hidden={hidden} />;
};

const FACE_1: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "edge", index: 0 },
      to: { type: "center" },
    },
    {
      faceIndex: 1,
      from: { type: "edge", index: 2 },
      to: { type: "center" },
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      from: { type: "edge", index: 0 },
      to: { type: "center" },
    },
    {
      faceIndex: 2,
      from: { type: "edge", index: 2 },
      to: { type: "center" },
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "edge", index: 2 },
      to: { type: "center" },
    },
    {
      faceIndex: 2,
      from: { type: "edge", index: 0 },
      to: { type: "center" },
    },
  ],
};
