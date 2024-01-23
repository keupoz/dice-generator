import { createContext } from "react";

export const SettingsSectionContext = createContext({
  currentSection: null as string | null,
  setCurrentSection(value: string | null) {
    console.log(value);
  },
});
