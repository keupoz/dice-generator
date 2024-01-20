import { Font } from "fontkit";
import { create } from "zustand";

interface FontSettingsState {
  fonts: Font[];
  textFont: Font | null;
  markFont: Font | null;
  textFeatures: Record<string, boolean>;
  markFeatures: Record<string, boolean>;
  segments: number;
  fontScale: number;
  depth: number;
}

export const useFontSettings = create<FontSettingsState>(() => ({
  fonts: [],

  textFont: null as Font | null,
  markFont: null as Font | null,

  textFeatures: {},
  markFeatures: {},

  segments: 4,
  fontScale: 0.75,
  depth: 0.75,
}));

export function getFont(name: string) {
  const fonts = useFontSettings.getState().fonts;
  const font = fonts.find((font) => font.fullName === name);

  if (font === undefined) {
    throw new Error(`Unknown font name "${name}"`);
  }

  return font;
}
