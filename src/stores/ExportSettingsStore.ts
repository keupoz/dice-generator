import { Object3D } from "three";
import { create } from "zustand";

export interface ExportSettingsState {
  renderMode: string;
  renderOperation: string;
}

export const useExportSettings = create<ExportSettingsState>(() => ({
  renderMode: "Preview",
  renderOperation: "Subtract",
}));

let exportObject: Object3D | null = null;

export function setExportObject(value: Object3D | null) {
  exportObject = value;
}

export function getExportObject() {
  return exportObject;
}
