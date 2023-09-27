import { Object3D } from "three";
import { create } from "zustand";

export interface ExportSettingsState {
  exportObject: Object3D | null;
  renderMode: string;
  renderOperation: string;
}

export interface ExportSettingsActions {
  setExportObject(value: ExportSettingsState["exportObject"]): void;
  setRenderMode(value: ExportSettingsState["renderMode"]): void;
  setRenderOperation(value: ExportSettingsState["renderOperation"]): void;
}

export const useExportSettings = create<
  ExportSettingsState & ExportSettingsActions
>((set) => ({
  exportObject: null,
  renderMode: "Preview",
  renderOperation: "Subtract",

  setExportObject: (exportObject) => set({ exportObject }),
  setRenderMode: (renderMode) => set({ renderMode }),
  setRenderOperation: (renderOperation) => set({ renderOperation }),
}));
