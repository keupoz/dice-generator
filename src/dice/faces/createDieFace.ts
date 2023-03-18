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
    try {
      let baseGroup = initialGroup();

      const defaultRotation = config.localRotation ?? 0;
      baseGroup = rotateZ(
        defaultRotation + degToRad(localRotation()),
        baseGroup
      );
      baseGroup = translate(localOffset(), baseGroup);

      const result: BufferedGeom3[] = [];

      for (const instance of config.instances) {
        const info = getInstanceFaceInfo(base(), instance);

        let instanceGroup = baseGroup;

        let groupScale = info.length;
        groupScale *= fontScale() * globalOptions.fontScale();
        instanceGroup = scale(
          [groupScale, groupScale, globalOptions.depth()],
          instanceGroup
        );

        instanceGroup = transform(info.rotationMatrix, instanceGroup);
        instanceGroup = translate(info.center, instanceGroup);

        instanceGroup = forceGroup(instanceGroup);

        result.push(...instanceGroup);
      }

      return result;
    } catch (err) {
      return [];
    }
  });

  return finalGroup;
}
