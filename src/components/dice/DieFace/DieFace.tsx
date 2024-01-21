import { Clone } from "@/components/three/Clone";
import { CSGContext } from "@/components/three/csg/CSGContext";
import { MaterialsContext } from "@/contexts";
import { useTextGeometry } from "@/hooks/useTextGeometry";
import { useFontSettings } from "@/stores/FontSettingsStore";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { FC, Fragment, memo, useContext, useLayoutEffect } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { FaceInfo } from "../utils/types";
import { useInfos } from "./useInfos";
import { useMarkBrush } from "./useMarkBrush";
import { useTextBrush } from "./useTextBrush";

export interface DieFaceProps {
  info: FaceInfo;
  geom: Geom3;
  fontScale: number;
}

export const DieFace: FC<DieFaceProps> = memo(({ info, geom, fontScale }) => {
  const state = info.useStore();
  const fontSettings = useFontSettings();
  const { fontMaterial } = useContext(MaterialsContext);

  let textGeometry = useTextGeometry(
    fontSettings.textFont,
    fontSettings.textFeatures,
    state.text,
    fontSettings.segments
  );

  let markGeometry = useTextGeometry(
    fontSettings.markFont,
    fontSettings.markFeatures,
    state.mark,
    fontSettings.segments
  );

  if (!textGeometry) {
    textGeometry = markGeometry;
    markGeometry = null;
  }

  const textBrush = useTextBrush(textGeometry, fontMaterial);

  const markBrush = useMarkBrush(
    textGeometry,
    markGeometry,
    fontMaterial,
    state.isUnderscore,
    state.markGap
  );

  const infos = useInfos(info.config.instances, geom);

  const updateCSG = useContext(CSGContext);

  useLayoutEffect(() => {
    updateCSG();
  });

  return infos.map((subInfo, i) => {
    const scale = subInfo.length * fontSettings.fontScale * fontScale;
    const rotation =
      (info.config.localRotation ?? 0) + degToRad(state.rotation);

    return (
      <Fragment key={i}>
        <group position={subInfo.center}>
          <group {...subInfo.rotationMatrix}>
            <group scale-x={scale} scale-y={scale} scale-z={fontSettings.depth}>
              <group position-x={state.offsetX} position-y={state.offsetY}>
                <group rotation-z={rotation}>
                  {textBrush && <Clone object={textBrush} />}
                  {markBrush && <Clone object={markBrush} />}
                </group>
              </group>
            </group>
          </group>
        </group>
      </Fragment>
    );
  });
});
