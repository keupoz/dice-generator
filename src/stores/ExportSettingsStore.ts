import { Object3D } from "three";
import { create } from "zustand";

export interface ExportSettingsState {
  enableAlign: boolean;
  enableRender: boolean;
  renderOperation: string;
}

export const useExportSettings = create<ExportSettingsState>(() => ({
  enableAlign: true,
  enableRender: false,
  renderOperation: "Subtract",
}));

let exportObject: Object3D | null = null;

export function setExportObject(value: Object3D | null) {
  exportObject = value;
}

export function getExportObject() {
  return exportObject;
}
