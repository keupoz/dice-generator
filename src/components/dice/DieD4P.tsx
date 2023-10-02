import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { polyhedron } from "@jscad/modeling/src/primitives";
import { useControls } from "leva";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

const NAME = "d4p";

export const DieD4P: FC = () => {
  const { exportRef, size, fontScale, hidden } = useDieControls(NAME, 14);

  const { length1, length2 } = useControls(NAME, {
    length1: { value: 20, min: 1, max: 40, step: 1, label: "Body length" },
    length2: { value: 6, min: 1, max: 40, step: 1, label: "Point length" },
  });

  const geom = useMemo(() => {
    const center = size / 2;
    const y = (length1 - length2) / 2;

    return polyhedron({
      points: [
        // Tips
        /*
             0
            / \
           /   \
          a-----b
        */
        [0, -length1 + y, 0], // 0
        [0, length2 + y, 0], // 1

        // Base
        /* x, z
          2------3
          |      |
          |      |
          4------5
        */
        [-center, y, center], // 2
        [center, y, center], // 3
        [-center, y, -center], // 4
        [center, y, -center], // 5
      ],

      faces: [
        [0, 5, 4],
        [0, 3, 5],
        [0, 2, 3],
        [0, 4, 2],

        [1, 4, 5],
        [1, 5, 3],
        [1, 3, 2],
        [1, 2, 4],
      ],

      orientation: "inward",
    });
  }, [length1, length2, size]);

  const face1 = useDieFace(NAME, 0, geom, fontScale, FACE_1);
  const face2 = useDieFace(NAME, 1, geom, fontScale, FACE_2);
  const face3 = useDieFace(NAME, 2, geom, fontScale, FACE_3);
  const face4 = useDieFace(NAME, 3, geom, fontScale, FACE_4);

  const faces = useMemo(() => {
    return [face1, face2, face3, face4];
  }, [face1, face2, face3, face4]);

  return (
    <FinalDie
      ref={exportRef}
      geom={geom}
      faces={faces}
      hidden={hidden}
      alignFaceConfig={FACE_1}
    />
  );
};

const t = 2 / 3;

const FACE_1: DieFaceConfig = {
  instances: [
    {
      faceIndex: 2,
      from: { type: "edge", index: 1 },
      to: { type: "center" },
      t,
    },
  ],
};

const FACE_2: DieFaceConfig = {
  instances: [
    {
      faceIndex: 3,
      from: { type: "edge", index: 1 },
      to: { type: "center" },
      t,
    },
  ],
};

const FACE_3: DieFaceConfig = {
  instances: [
    {
      faceIndex: 1,
      from: { type: "edge", index: 1 },
      to: { type: "center" },
      t,
    },
  ],
};

const FACE_4: DieFaceConfig = {
  instances: [
    {
      faceIndex: 0,
      from: { type: "edge", index: 1 },
      to: { type: "center" },
      t,
    },
  ],
};
