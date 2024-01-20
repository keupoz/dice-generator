import { CSGContext } from "@/components/three/csg/CSGContext";
import { MaterialsContext } from "@/contexts";
import { useTextGeometry } from "@/hooks/useTextGeometry";
import { useFontSettings } from "@/stores/FontSettingsStore";
import { maybePush } from "@/utils/maybePush";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { FC, memo, useContext, useLayoutEffect, useMemo } from "react";
import { Matrix4 } from "three";
import { Brush } from "three-bvh-csg";
import { FaceInfo } from "../utils/types";
import { useBaseMatrix } from "./useBaseMatrix";
import { useFinalMatrices } from "./useFinalMatrices";
import { useInfos } from "./useInfos";
import { useInstanceMatrices } from "./useInstanceMatrices";
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

  const baseMatrix = useBaseMatrix(
    info.config.localRotation ?? 0,
    state.offsetX,
    state.offsetY,
    state.rotation
  );

  const instanceMatrices = useInstanceMatrices(
    infos,
    fontSettings.fontScale * fontScale,
    fontSettings.depth
  );

  const finalMatrices = useFinalMatrices(baseMatrix, instanceMatrices);

  const initialGroup = useMemo(() => {
    const result: Brush[] = [];

    maybePush(textBrush, result);
    maybePush(markBrush, result);

    return result;
  }, [textBrush, markBrush]);

  const finalGroup = useMemo(() => {
    const result: Brush[] = [];

    for (const matrix of finalMatrices) {
      const mat = new Matrix4().fromArray(matrix);

      for (const brush of initialGroup) {
        const clone = brush.clone();

        clone.applyMatrix4(mat);
        clone.updateMatrixWorld();

        result.push(clone);
      }
    }

    return result;
  }, [finalMatrices, initialGroup]);

  const updateCSG = useContext(CSGContext);

  useLayoutEffect(() => {
    updateCSG();
  }, [state, updateCSG]);

  return finalGroup.map((brush, i) => <primitive key={i} object={brush} />);
});
