import { InstanceFaceConfig } from "@/utils/faces/getInstanceFaceInfo";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { Object3D } from "three";
import { StoreApi, UseBoundStore } from "zustand";

export interface DieInputConfig {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
}

export type DieInputValues<T extends Record<string, DieInputConfig>> = {
  [K in keyof T]: T[K]["value"];
};

export type GeomBuilderOptions<T extends Record<string, DieInputConfig>> = {
  size: number;
} & DieInputValues<T>;

export type GeomBuilder<T extends Record<string, DieInputConfig>> = (
  options: GeomBuilderOptions<T>
) => Geom3;

export interface DieFaceConfig {
  text?: string;
  localRotation?: number;
  instances: InstanceFaceConfig[];
}

export interface DieConfig<T extends Record<string, DieInputConfig>> {
  name: string;
  defaultSize: number;
  defaultFontScale?: number;
  extraOptions: T;
  base: GeomBuilder<T>;
  facesBase?: GeomBuilder<T>;
  alignFaceIndex?: number;
  invertAlignMatrix?: boolean;
  faces: DieFaceConfig[];
}

export interface DieOptions<T extends Record<string, DieInputConfig>> {
  visible: boolean;
  size: number;
  fontScale: number;
  extraOptions: T;
}

export interface DiceOptionsStore {
  dice: Record<string, DieOptions<Record<string, DieInputConfig>>>;
}

export interface DieOptionsStore<T extends Record<string, DieInputConfig>> {
  visible: boolean;
  size: number;
  fontScale: number;
  extraOptions: DieInputValues<T>;

  setExtraOptions: <K extends keyof T>(name: K, value: T[K]["value"]) => void;
}

export interface DieFaceStore {
  text: string;
  mark: string;
  isUnderscore: boolean;
  markGap: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export interface FaceInfo {
  name: string;
  config: DieFaceConfig;
  useStore: UseBoundStore<StoreApi<DieFaceStore>>;
}

export interface DieInfo {
  object: Object3D | null;
  config: DieConfig<Record<string, DieInputConfig>>;
  useStore: UseBoundStore<
    StoreApi<DieOptionsStore<Record<string, DieInputConfig>>>
  >;
  faces: FaceInfo[];
}
