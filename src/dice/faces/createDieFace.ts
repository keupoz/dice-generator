import { BufferedGeom3 } from "@/BufferedGeom3";
import { createBoolean } from "@/hooks/controls/createBoolean";
import { createFolder } from "@/hooks/controls/createFolder";
import { createPoint2D } from "@/hooks/controls/createPoint2D";
import { createSlider } from "@/hooks/controls/createSlider";
import { createString } from "@/hooks/controls/createString";
import { flatPush } from "@/utils/flatPush";
import { maybePush } from "@/utils/maybePush";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import mat4 from "@jscad/modeling/src/maths/mat4";
import vec3 from "@jscad/modeling/src/maths/vec3";
import { measureDimensions } from "@jscad/modeling/src/measurements";
import {
  align,
  transform,
  translate,
  translateY,
} from "@jscad/modeling/src/operations/transforms";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";
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
  markFont: Accessor<Font>;
  segments: Accessor<number>;
  depth: Accessor<number>;
  fontScale: Accessor<number>;
}

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
  const [gap] = createSlider(folder, -2, 2, 0.01, 0.1, "Gap");
  const [localRotation] = createSlider(folder, 0, 360, 1, 0, "Rotation");
  const [localOffset] = createPoint2D(
    folder,
    -2,
    2,
    0.01,
    [0, 0],
    "Text offset"
  );

  const initialTextGeom = createText(
    text,
    globalOptions.textFont,
    globalOptions.segments
  );
  const initialMarkGeom = createText(
    mark,
    globalOptions.markFont,
    globalOptions.segments
  );

  const geom1 = createMemo(() => {
    let result = initialTextGeom();

    if (result === null) return null;

    result = align({ modes: ["center", "center", "center"] }, result);

    return result;
  });

  const geom2 = createMemo(() => {
    let result = initialMarkGeom();

    if (result === null) return null;

    const accessedGeom1 = geom1();

    if (accessedGeom1 === null) {
      result = align({ modes: ["center", "center", "center"] }, result);
    } else {
      const textDimensions = measureDimensions(accessedGeom1);
      const textPivot = vec3.scale(vec3.create(), textDimensions, 0.5);

      if (isUnderscore()) {
        const offset = textPivot[1] + gap();

        result = align({ modes: ["center", "max", "center"] }, result);
        result = translateY(-offset, result);
      } else {
        const offsetX = textPivot[0] + gap();
        const offsetY = textPivot[1];

        result = align({ modes: ["min", "none", "center"] }, result);
        result = translate([offsetX, -offsetY], result);
      }
    }

    return result;
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
      const scale = info.length * fontScale();

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
    const result: BufferedGeom3[] = [];

    maybePush(geom1(), result);
    maybePush(geom2(), result);

    return result;
  });

  const finalGroup = createMemo(() => {
    const group = initialGroup();

    let result: BufferedGeom3[] = [];

    for (const matrix of finalMatrices()) {
      flatPush(transform(matrix, group), result);
    }

    return result;
  });

  return finalGroup;
}
