import { FontCache } from "@/FontCache";
import { createBoolean } from "@/hooks/controls/createBoolean";
import { createFolder } from "@/hooks/controls/createFolder";
import { createPoint2D } from "@/hooks/controls/createPoint2D";
import { createSlider } from "@/hooks/controls/createSlider";
import { createString } from "@/hooks/controls/createString";
import { FONT_MATERIAL } from "@/materials";
import { alignMesh, getBoundingBox } from "@/utils/boundingBox";
import { maybePush } from "@/utils/maybePush";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import mat4 from "@jscad/modeling/src/maths/mat4";
import { Font } from "fontkit";
import { Accessor, createMemo } from "solid-js";
import { Matrix4, Vector3 } from "three";
import { Brush } from "three-bvh-csg";
import { degToRad } from "three/src/math/MathUtils";
import { FolderApi } from "tweakpane";
import { createText } from "../../hooks/3d/createText";
import { getInstanceFaceInfo, InstanceFaceConfig } from "./getInstanceFaceInfo";

export interface DieFaceConfig {
  text?: string;
  localRotation?: number;
  instances: InstanceFaceConfig[];
}

export interface DieFaceGlobalOptions {
  textFont: Accessor<Font>;
  textFeatures: Accessor<Record<string, boolean>>;

  markFont: Accessor<Font>;
  markFeatures: Accessor<Record<string, boolean>>;

  segments: Accessor<number>;
  depth: Accessor<number>;
  fontScale: Accessor<number>;
}

const textCache = new FontCache();
const markCache = new FontCache();

export function createDieFace(
  index: number,
  folder: FolderApi,
  base: Accessor<Geom3>,
  config: DieFaceConfig,
  globalOptions: DieFaceGlobalOptions,
  fontScale: Accessor<number>
) {
  const defaultText = config.text ?? `${index + 1}`;
  const defaultMark = defaultText === "6" || defaultText === "9" ? "_" : "";

  folder = createFolder(folder, `Face ${defaultText}`, false);

  const [text] = createString(folder, defaultText, "Text");
  const [mark] = createString(folder, defaultMark, "Mark");
  const [isUnderscore] = createBoolean(folder, true, "Underscore");
  const [markGap] = createSlider(folder, -2, 2, 0.01, 0.1, "Gap");
  const [localRotation] = createSlider(folder, 0, 360, 1, 0, "Rotation");
  const [localOffset] = createPoint2D(
    folder,
    -2,
    2,
    0.01,
    [0, 0],
    "Text offset"
  );

  const textGeometry = createText(
    text,
    globalOptions.textFont,
    globalOptions.textFeatures,
    globalOptions.segments,
    textCache
  );

  const markGeometry = createText(
    mark,
    globalOptions.markFont,
    globalOptions.markFeatures,
    globalOptions.segments,
    markCache
  );

  const textBrush = createMemo(() => {
    const geometry = textGeometry();

    if (geometry === null) return null;

    const brush = new Brush(geometry, FONT_MATERIAL);
    brush.layers.mask = 0b11;

    alignMesh({ modes: ["center", "center", "center"] }, brush);

    return brush;
  });

  const markBrush = createMemo(() => {
    const geometry = markGeometry();

    if (geometry === null) return null;

    const accessedTextGeometry = textGeometry();
    const brush = new Brush(geometry, FONT_MATERIAL);
    brush.layers.mask = 0b11;

    if (accessedTextGeometry === null) {
      alignMesh({ modes: ["center", "center", "center"] }, brush);
    } else {
      const textBounds = getBoundingBox(accessedTextGeometry);
      const textPivot = textBounds.getSize(new Vector3()).multiplyScalar(0.5);

      if (isUnderscore()) {
        const offset = textPivot.y + markGap();

        alignMesh({ modes: ["center", "max", "center"] }, brush);

        brush.position.y -= offset;
      } else {
        const offsetX = textPivot.x + markGap();
        const offsetY = textPivot.y;

        alignMesh({ modes: ["min", "none", "center"] }, brush);

        brush.position.x += offsetX;
        brush.position.y -= offsetY;
      }
    }

    return brush;
  });

  const infos = createMemo(() => {
    return config.instances.map((instance) => {
      return getInstanceFaceInfo(base(), instance);
    });
  });

  const baseMatrix = createMemo(() => {
    const result = mat4.create();
    const defaultRotation = config.localRotation ?? 0;

    mat4.translate(result, result, [...localOffset(), 0]);
    mat4.rotateZ(result, result, defaultRotation + degToRad(localRotation()));

    return result;
  });

  const instanceMatrices = createMemo(() => {
    return infos().map((info) => {
      const result = mat4.create();
      const scale = info.length * fontScale() * globalOptions.fontScale();

      mat4.translate(result, result, info.center);
      mat4.multiply(result, result, info.rotationMatrix);
      mat4.scale(result, result, [scale, scale, globalOptions.depth()]);

      return result;
    });
  });

  const finalMatrices = createMemo(() => {
    const accessedBaseMatrix = baseMatrix();

    return instanceMatrices().map((instanceMatrix) => {
      return mat4.multiply(mat4.create(), instanceMatrix, accessedBaseMatrix);
    });
  });

  const initialGroup = createMemo(() => {
    const result: Brush[] = [];

    maybePush(textBrush(), result);
    maybePush(markBrush(), result);

    return result;
  });

  const finalGroup = createMemo(() => {
    const group = initialGroup();

    const result: Brush[] = [];

    for (const matrix of finalMatrices()) {
      const mat = new Matrix4().fromArray(matrix);

      for (const brush of group) {
        const clone = brush.clone();

        clone.applyMatrix4(mat);
        clone.updateMatrixWorld();

        result.push(clone);
      }
    }

    return result;
  });

  return finalGroup;
}
