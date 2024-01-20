import { createContext } from "react";
import { Material } from "three";

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
