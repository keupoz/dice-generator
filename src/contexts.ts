import { createContext } from "react";
import { Material, Object3D } from "three";

export const SceneContext = createContext({
  focusObject(object: Object3D, position = false) {
    console.log(object, position);
  },
});

export const MaterialsContext = createContext({
  baseMaterial: undefined as Material | undefined,
  fontMaterial: undefined as Material | undefined,
});

export const SettingsSectionContext = createContext({
  currentSection: null as string | null,
  setCurrentSection(value: string | null) {
    console.log(value);
  },
});
