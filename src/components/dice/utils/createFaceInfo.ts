import { create } from "zustand";
import { DieFaceConfig, DieFaceStore, FaceInfo } from "./types";

export function createFaceInfo(config: DieFaceConfig, index: number): FaceInfo {
  const defaultText = config.text ?? `${index + 1}`;
  const defaultMark = defaultText === "6" || defaultText === "9" ? "_" : "";

  const name = `Face ${defaultText}`;

  const useStore = create<DieFaceStore>(() => ({
    text: defaultText,
    mark: defaultMark,
    isUnderscore: true,
    markGap: 0.1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  }));

  return { name, config, useStore };
}
