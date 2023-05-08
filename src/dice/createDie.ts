import { isBufferedGeom3 } from "@/BufferedGeom3";
import { RenderMode, RenderOperation } from "@/dice/renderMode";
import { createBoolean } from "@/hooks/controls/createBoolean";
import { createFolder } from "@/hooks/controls/createFolder";
import { createSlider } from "@/hooks/controls/createSlider";
import { BASE_MATERIAL } from "@/materials";
import { cad2brush } from "@/utils/3d/convert/cad2three";
import { alignMesh } from "@/utils/boundingBox";
import { getFirstItem } from "@/utils/getFirstItem";
import { invertMat4 } from "@/utils/invertMat4";
import { d180 } from "@/utils/math";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import mat4 from "@jscad/modeling/src/maths/mat4";
import { Vec3 } from "@jscad/modeling/src/maths/types";
import { measureDimensions } from "@jscad/modeling/src/measurements";
import { Accessor, createMemo } from "solid-js";
import { Group, Matrix4, Object3D } from "three";
import { ADDITION, Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";
import { FolderApi } from "tweakpane";
import {
  createDieFace,
  DieFaceConfig,
  DieFaceGlobalOptions,
} from "./faces/createDieFace";
import { getInstanceFaceInfo } from "./faces/getInstanceFaceInfo";

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
  result: Accessor<Object3D | null>;
  dimensions: Accessor<Vec3>;
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

  const base = createMemo<Geom3>((prev) => {
    if (prev !== undefined && isBufferedGeom3(prev)) {
      prev.polygons.buffer.dispose();
    }

    const geom = baseOptions.base(accessorOptions);

    return geom;
  });

  const dimensions = createMemo(() => {
    return measureDimensions(base());
  });

  const baseBrush = createMemo(() => {
    return cad2brush(base(), BASE_MATERIAL);
  });

  const facesBase = createMemo(() => {
    return baseOptions.facesBase?.(accessorOptions) ?? base();
  });

  const faces = parseFaces(
    folder,
    facesBase,
    baseOptions.faces,
    options.faceOptions,
    fontScale
  );

  const evaluator = new Evaluator();

  const finalBase = createMemo<Group | null>((prev) => {
    prev?.clear();

    if (hidden()) return null;

    const group = new Group();

    if (options.renderMode() === "preview") {
      group.add(baseBrush(), ...faces());

      return group;
    }

    const operation =
      options.renderOperation() === "union" ? ADDITION : SUBTRACTION;

    let result = baseBrush();
    result.updateMatrixWorld();

    for (const face of faces()) {
      face.updateMatrixWorld();
      result = evaluator.evaluate(result, face, operation);
    }

    if (options.renderMode() === "stl") {
      const alignFace = baseOptions.faces[0];

      if (alignFace !== undefined) {
        const instance = getFirstItem(alignFace.instances);
        const info = getInstanceFaceInfo(facesBase(), instance);

        const matrix = invertMat4(mat4.create(), info.rotationMatrix);

        result.applyMatrix4(new Matrix4().fromArray(matrix));
        result.rotation.x += d180;
      }

      alignMesh({ modes: ["none", "none", "min"] }, result);
    }

    result.layers.mask = 0b11;
    group.add(result);

    return group;
  });

  return { x, y, result: finalBase, dimensions };
}

function parseFaces(
  folder: FolderApi,
  base: Accessor<Geom3>,
  configs: DieFaceConfig[],
  globalOptions: DieFaceGlobalOptions,
  fontScale: Accessor<number>
) {
  const faces: Accessor<Brush[]>[] = [];

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
    const result: Brush[] = [];

    for (const face of faces) {
      result.push(...face());
    }

    return result;
  });

  return finalFaces;
}
