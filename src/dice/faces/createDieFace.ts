import { BufferedGeom3 } from "@/BufferedGeom3";
import { createText1 } from "@/dice/faces/createText1";
import { createText2 } from "@/dice/faces/createText2";
import { createBoolean } from "@/hooks/controls/createBoolean";
import { createFolder } from "@/hooks/controls/createFolder";
import { createPoint2D } from "@/hooks/controls/createPoint2D";
import { createSlider } from "@/hooks/controls/createSlider";
import { createString } from "@/hooks/controls/createString";
import { forceGroup } from "@/utils/forceGroup";
import { maybePush } from "@/utils/maybePush";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import vec2, { Vec2 } from "@jscad/modeling/src/maths/vec2";
import { measureBoundingBox } from "@jscad/modeling/src/measurements";
import {
  align,
  rotateZ,
  scale,
  transform,
  translate,
} from "@jscad/modeling/src/operations/transforms";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";
import { degToRad } from "three/src/math/MathUtils";
import { FolderApi } from "tweakpane";
import { FaceCenter, FaceTarget, getFaceInfo } from "./getFaceInfo";

export interface DieFaceConfig {
  faceIndex: number;
  target?: FaceTarget;
  text?: string;
  localRotation?: number;
  center?: FaceCenter;
  extraInstances?: ExtraConfig[];
}

export interface ExtraConfig {
  faceIndex: number;
  target?: FaceTarget;
  center?: FaceCenter;
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

  const [geom1, offset1] = createText1(
    text,
    globalOptions.textFont,
    globalOptions.segments
  );
  const geom2 = createText2(
    mark,
    globalOptions.markFont,
    globalOptions.segments,
    offset1,
    isUnderscore,
    gap
  );

  const groupOffset = createMemo<Vec2>(() => {
    // Align group by either text1 or text2 bounding box
    const geom = geom1() ?? geom2();

    if (geom === null) return vec2.create();

    const bounds = measureBoundingBox(geom);

    const x = -(bounds[0][0] + bounds[1][0]) / 2;
    const y = -(bounds[0][1] + bounds[1][1]) / 2;

    return vec2.fromValues(x, y);
  });

  const initialGroup = createMemo(() => {
    const geoms: BufferedGeom3[] = [];

    maybePush(geom1(), geoms);
    maybePush(geom2(), geoms);

    let result = align(
      {
        modes: ["none", "none", "center"],
        grouped: true,
      },
      geoms
    );

    result = translate(groupOffset(), result);

    return result;
  });

  const finalGroup = createMemo(() => {
    let result = initialGroup();

    const info = getFaceInfo(
      base(),
      config.faceIndex,
      config.target,
      config.center
    );

    let groupScale = Math.sqrt(info.area);
    groupScale *= fontScale() * globalOptions.fontScale();

    /* let groupScale = geomFace().area / baseSize() ** 2;
    groupScale *= extraScale;
    groupScale *= baseSize() * globalOptions.fontScale() * fontScale(); */

    const defaultRotation = config.localRotation ?? 0;
    result = rotateZ(defaultRotation + degToRad(localRotation()), result);
    result = translate(localOffset(), result);

    result = scale([groupScale, groupScale, globalOptions.depth()], result);

    const extras: BufferedGeom3[] = [];

    if (config.extraInstances !== undefined) {
      for (const extraConfig of config.extraInstances) {
        const extraInfo = getFaceInfo(
          base(),
          extraConfig.faceIndex,
          extraConfig.target,
          extraConfig.center
        );

        let group = result;
        group = transform(extraInfo.rotationMatrix, group);
        group = translate(extraInfo.center, group);

        group = forceGroup(group);

        extras.push(...group);
      }
    }

    result = transform(info.rotationMatrix, result);
    result = translate(info.center, result);

    result = forceGroup(result);

    result.push(...extras);

    return result;
  });

  return finalGroup;
}
