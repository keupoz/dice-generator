import { BufferedGeom3 } from "@/BufferedGeom3";
import { RenderMode, RenderOperation } from "@/dice/renderMode";
import { createBoolean } from "@/hooks/controls/createBoolean";
import { createFolder } from "@/hooks/controls/createFolder";
import { createSlider } from "@/hooks/controls/createSlider";
import { invertMat4 } from "@/utils/invertMat4";
import { d180 } from "@/utils/math";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import mat4 from "@jscad/modeling/src/maths/mat4";
import subtract from "@jscad/modeling/src/operations/booleans/subtract";
import union from "@jscad/modeling/src/operations/booleans/union";
import { rotateY, transform } from "@jscad/modeling/src/operations/transforms";
import align from "@jscad/modeling/src/operations/transforms/align";
import { Accessor, createMemo } from "solid-js";
import { FolderApi } from "tweakpane";
import {
  createDieFace,
  DieFaceConfig,
  DieFaceGlobalOptions,
} from "./faces/createDieFace";
import { getFaceInfo } from "./faces/getFaceInfo";

export interface DieOptions {
  folder: FolderApi;
  faceOptions: DieFaceGlobalOptions;
  renderMode: Accessor<RenderMode>;
  renderOperation: Accessor<RenderOperation>;
}

export type AccessorRecord<T extends Record<string, unknown>> = {
  [Key in keyof T]: T[Key];
};

export type CustomAccessorOptions<T extends Record<string, unknown>> = {
  size: Accessor<number>;
} & AccessorRecord<T>;

export type CustomAccessor<T, S extends Record<string, unknown>> = (
  options: CustomAccessorOptions<S>
) => T;

export interface AbstractDieOptions<T extends Record<string, unknown>> {
  name: string;
  defaultSize: number;
  faceScale?: number;
  faces: DieFaceConfig[];
  extraOptions: (
    folder: FolderApi,
    size: Accessor<number>
  ) => AccessorRecord<T>;
  base: CustomAccessor<Geom3, T>;
  facesBase?: CustomAccessor<Geom3, T>;
}

export interface DieResult {
  x: number;
  y: number;
  base: Accessor<Geom3 | null>;
  faces: Accessor<BufferedGeom3[]>;
  size: Accessor<number>;
}

export type DieFactory = (
  x: number,
  y: number,
  options: DieOptions
) => DieResult;

export function createDie<T extends Record<string, unknown>>(
  x: number,
  y: number,
  baseOptions: AbstractDieOptions<T>,
  options: DieOptions
): DieResult {
  const folder = createFolder(options.folder, baseOptions.name, false);

  const [hidden] = createBoolean(folder, false, "Hidden");

  const [size] = createSlider(
    folder,
    1,
    40,
    1,
    baseOptions.defaultSize,
    "Size"
  );

  const [fontScale] = createSlider(
    folder,
    0.05,
    3,
    0.05,
    baseOptions.faceScale ?? 0.75,
    "Font scale"
  );

  const extraOptions = baseOptions.extraOptions(folder, size);

  const accessorOptions: CustomAccessorOptions<T> = {
    size,
    ...extraOptions,
  };

  const base = baseOptions.base.bind(null, accessorOptions);
  const facesBase = baseOptions.facesBase?.bind(null, accessorOptions) ?? base;

  const faces = parseFaces(
    folder,
    facesBase,
    baseOptions.faces,
    options.faceOptions,
    fontScale
  );

  const finalBase = createMemo(() => {
    if (hidden()) return null;

    let result = base();

    if (options.renderMode() === "preview") {
      return result;
    }

    switch (options.renderOperation()) {
      case "subtract":
        result = subtract(result, faces());
        break;
      case "union":
        result = union(result, faces());
        break;
    }

    if (options.renderMode() === "stl") {
      const alignFace = baseOptions.faces[0];

      if (alignFace !== undefined) {
        const info = getFaceInfo(
          facesBase(),
          alignFace.faceIndex,
          alignFace.target
        );

        const matrix = invertMat4(mat4.create(), info.rotationMatrix);
        result = transform(matrix, result);
        result = rotateY(d180, result);
      }

      result = align({ modes: ["none", "none", "min"] }, result);
    }

    return result;
  });

  const finalFaces = createMemo(() => {
    if (!hidden() && options.renderMode() === "preview") {
      return faces();
    }

    return [];
  });

  return { x, y, size, base: finalBase, faces: finalFaces };
}

function parseFaces(
  folder: FolderApi,
  base: Accessor<Geom3>,
  configs: DieFaceConfig[],
  globalOptions: DieFaceGlobalOptions,
  fontScale: Accessor<number>
) {
  const faces: Accessor<BufferedGeom3[]>[] = [];

  let currentIndex = 0;

  for (const options of configs) {
    const face = createDieFace(
      currentIndex++,
      folder,
      base,
      options,
      globalOptions,
      fontScale
    );

    faces.push(face);
  }

  const finalFaces = createMemo(() => {
    const result: BufferedGeom3[] = [];

    for (const face of faces) {
      result.push(...face());
    }

    return result;
  });

  return finalFaces;
}
