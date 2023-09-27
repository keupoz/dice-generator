import { MaterialsContext } from "@/contexts";
import { useTextGeometry } from "@/hooks/useTextGeometry";
import { useFontSettings } from "@/stores/FontSettingsStore";
import { alignMesh, getBoundingBox } from "@/utils/alignMesh";
import {
  InstanceFaceConfig,
  getInstanceFaceInfo,
} from "@/utils/faces/getInstanceFaceInfo";
import { maybePush } from "@/utils/maybePush";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import mat4 from "@jscad/modeling/src/maths/mat4";
import { degToRad } from "@jscad/modeling/src/utils";
import { LevaInputs, folder, useControls } from "leva";
import { useContext, useMemo } from "react";
import { Matrix4, Vector3 } from "three";
import { Brush } from "three-bvh-csg";

export interface DieFaceConfig {
  text?: string;
  localRotation?: number;
  instances: InstanceFaceConfig[];
}

export function useDieFace(
  dieName: string,
  index: number,
  geom: Geom3,
  dieFontScale: number,
  config: DieFaceConfig
) {
  const defaultText = config.text ?? `${index + 1}`;
  const defaultMark = defaultText === "6" || defaultText === "9" ? "_" : "";

  const { text, mark, isUnderscore, markGap, rotation, offset } = useControls(
    dieName,
    {
      [`Face ${defaultText}`]: folder(
        {
          text: { value: defaultText, label: "Text", type: LevaInputs.STRING },
          mark: { value: defaultMark, label: "Mark", type: LevaInputs.STRING },
          isUnderscore: { value: true, label: "Underscore" },
          markGap: { value: 0.1, min: -2, max: 2, step: 0.01, label: "Gap" },
          rotation: { value: 0, min: 0, max: 360, step: 1, label: "Rotation" },
          offset: {
            value: [0, 0],
            min: -2,
            max: 2,
            step: 0.01,
            label: "Text offset",
            type: LevaInputs.VECTOR2D,
          },
        },
        {
          collapsed: true,
        }
      ),
    }
  );

  const fontSettings = useFontSettings();
  const { fontMaterial } = useContext(MaterialsContext);

  const textGeometry = useTextGeometry(
    fontSettings.textFont,
    fontSettings.textFeatures,
    text,
    fontSettings.segments
  );

  const markGeometry = useTextGeometry(
    fontSettings.markFont,
    fontSettings.markFeatures,
    mark,
    fontSettings.segments
  );

  const textBrush = useMemo(() => {
    if (textGeometry === null) return null;

    const brush = new Brush(textGeometry, fontMaterial);

    alignMesh({ modes: ["center", "center", "center"] }, brush);

    return brush;
  }, [fontMaterial, textGeometry]);

  const markBrush = useMemo(() => {
    if (markGeometry === null) return null;

    const brush = new Brush(markGeometry, fontMaterial);

    if (textGeometry === null) {
      alignMesh({ modes: ["center", "center", "center"] }, brush);
    } else {
      const textBounds = getBoundingBox(textGeometry);
      const textPivot = textBounds.getSize(new Vector3()).multiplyScalar(0.5);

      if (isUnderscore) {
        const offset = textPivot.y + markGap;

        alignMesh({ modes: ["center", "max", "center"] }, brush);

        brush.position.y -= offset;
      } else {
        const offsetX = textPivot.x + markGap;
        const offsetY = textPivot.y;

        alignMesh({ modes: ["min", "none", "center"] }, brush);

        brush.position.x += offsetX;
        brush.position.y -= offsetY;
      }
    }

    return brush;
  }, [fontMaterial, isUnderscore, markGap, markGeometry, textGeometry]);

  const infos = useMemo(() => {
    return config.instances.map((config) => {
      return getInstanceFaceInfo(geom, config);
    });
  }, [config.instances, geom]);

  const baseMatrix = useMemo(() => {
    const result = mat4.create();
    const defaultRotation = config.localRotation ?? 0;

    mat4.translate(result, result, [...offset, 0]);
    mat4.rotateZ(result, result, defaultRotation + degToRad(rotation));

    return result;
  }, [config.localRotation, offset, rotation]);

  const instanceMatrices = useMemo(() => {
    return infos.map((info) => {
      const result = mat4.create();
      const scale = info.length * fontSettings.fontScale * dieFontScale;

      mat4.translate(result, result, info.center);
      mat4.multiply(result, result, info.rotationMatrix);
      mat4.scale(result, result, [scale, scale, fontSettings.depth]);

      return result;
    });
  }, [dieFontScale, fontSettings.depth, fontSettings.fontScale, infos]);

  const finalMatrices = useMemo(() => {
    return instanceMatrices.map((instanceMatrix) => {
      return mat4.multiply(mat4.create(), instanceMatrix, baseMatrix);
    });
  }, [baseMatrix, instanceMatrices]);

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

  return finalGroup;
}
