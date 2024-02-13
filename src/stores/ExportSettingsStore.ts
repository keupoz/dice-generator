import { AVAILABLE_EVALUATORS } from "@/components/three/csg/availableEvaluators";
import { AVAILABLE_OPERATIONS } from "@/components/three/csg/availableOperations";
import { getFirstItem } from "@/utils/getFirstItem";
import { Object3D } from "three";
import { create } from "zustand";

export interface ExportSettingsState {
  enableAlign: boolean;
  enableRender: boolean;
  renderOperation: string;
  renderMethod: string;
}

export const useExportSettings = create<ExportSettingsState>(() => ({
  enableAlign: true,
  enableRender: false,
  renderOperation: getFirstItem(Object.keys(AVAILABLE_OPERATIONS)),
  renderMethod: getFirstItem(Object.keys(AVAILABLE_EVALUATORS)),
}));

let exportObject: Object3D | null = null;

export function setExportObject(value: Object3D | null) {
  exportObject = value;
}

export function getExportObject() {
  return exportObject;
}
