import { useUpdateCSG } from "@/components/three/csg/CSGContext";
import { useFontSettings } from "@/stores/FontSettingsStore";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { FC, Fragment, memo } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { FaceInfo } from "../utils/types";
import { FaceLayout } from "./FaceLayout";
import { Text3D } from "./Text3D";
import { useInfos } from "./useInfos";

export interface DieFaceProps {
  info: FaceInfo;
  geom: Geom3;
  fontScale: number;
}

export const DieFace: FC<DieFaceProps> = memo(({ info, geom, fontScale }) => {
  useUpdateCSG();

  const state = info.useStore();

  const textFont = useFontSettings((state) => state.textFont);
  const markFont = useFontSettings((state) => state.markFont);

  const textFeatures = useFontSettings((state) => state.textFeatures);
  const markFeatures = useFontSettings((state) => state.markFeatures);

  const globalFontScale = useFontSettings((state) => state.fontScale);
  const depth = useFontSettings((state) => state.depth);

  const infos = useInfos(info.config.instances, geom);

  return infos.map((subInfo, i) => {
    const scale = subInfo.length * globalFontScale * fontScale;
    const rotation =
      (info.config.localRotation ?? 0) + degToRad(state.rotation);

    return (
      <Fragment key={i}>
        <group position={subInfo.center}>
          <group {...subInfo.rotationMatrix}>
            <group scale-x={scale} scale-y={scale} scale-z={depth}>
              <group position-x={state.offsetX} position-y={state.offsetY}>
                <group rotation-z={rotation}>
                  <FaceLayout
                    isUnderscore={state.isUnderscore}
                    markGap={state.markGap}
                  >
                    <Text3D
                      text={state.text}
                      font={textFont}
                      features={textFeatures}
                    />

                    <Text3D
                      text={state.mark}
                      font={markFont}
                      features={markFeatures}
                    />
                  </FaceLayout>
                </group>
              </group>
            </group>
          </group>
        </group>
      </Fragment>
    );
  });
});
