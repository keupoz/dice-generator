import { useDieControls } from "@/hooks/useDieControls";
import { DieFaceConfig, useDieFace } from "@/hooks/useDieFace";
import { trapezohedron } from "@/utils/shapes/trapezohedron";
import { useControls } from "leva";
import { FC, useMemo } from "react";
import { FinalDie } from "../FinalDie";

export interface DieD10Props {
  isD100?: boolean;
}

export const DieD10: FC<DieD10Props> = ({ isD100 }) => {
  const name = isD100 ? "d00" : "d10";

  const faceConfigs = useMemo(() => {
    const flag = isD100 ?? false;

    return [
      createFaceConfig(flag, 0, 0),
      createFaceConfig(flag, 8, 1),
      createFaceConfig(flag, 2, 2),
      createFaceConfig(flag, 5, 3),
      createFaceConfig(flag, 3, 4),
      createFaceConfig(flag, 9, 5),
      createFaceConfig(flag, 1, 6),
      createFaceConfig(flag, 7, 7),
      createFaceConfig(flag, 4, 8),
      createFaceConfig(flag, 6, 9),
    ] as const;
  }, [isD100]);

  const { exportRef, size, fontScale, hidden } = useDieControls(
    name,
    16,
    isD100 ? 0.35 : 0.5
  );

  const { radius } = useControls(name, {
    radius: { value: size / 2, min: 1, max: 40, step: 1, label: "Radius" },
  });

  const geom = useMemo(() => {
    return trapezohedron(10, size / 2, radius);
  }, [radius, size]);

  const faces = [
    useDieFace(name, 0, geom, fontScale, faceConfigs[0]),
    useDieFace(name, 1, geom, fontScale, faceConfigs[1]),
    useDieFace(name, 2, geom, fontScale, faceConfigs[2]),
    useDieFace(name, 3, geom, fontScale, faceConfigs[3]),
    useDieFace(name, 4, geom, fontScale, faceConfigs[4]),
    useDieFace(name, 5, geom, fontScale, faceConfigs[5]),
    useDieFace(name, 6, geom, fontScale, faceConfigs[6]),
    useDieFace(name, 7, geom, fontScale, faceConfigs[7]),
    useDieFace(name, 8, geom, fontScale, faceConfigs[8]),
    useDieFace(name, 9, geom, fontScale, faceConfigs[9]),
  ];

  return (
    <FinalDie
      ref={exportRef}
      geom={geom}
      faces={faces}
      hidden={hidden}
      alignFaceConfig={faceConfigs[0]}
      invertMatrix
    />
  );
};

function createFaceConfig(isD100: boolean, index: number, i: number) {
  const config: DieFaceConfig = {
    instances: [
      {
        faceIndex: index,
        polygonCenter: true,
        from: { type: "vertex", index: 0 },
        to: { type: "vertex", index: 2 },
      },
    ],
  };

  if (i === 9) {
    config.text = "0";
  }

  if (isD100) {
    config.text ??= `${i + 1}`;
    config.text += "0";
    config.localRotation = Math.PI / 2;
  }

  return config;
}
