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

interface FontSettingsActions {
  getFont(name: string): Font;

  setFonts(font: FontSettingsState["fonts"]): void;
  setTextFont(font: FontSettingsState["textFont"]): void;
  setMarkFont(font: FontSettingsState["markFont"]): void;
  setTextFeatures(font: FontSettingsState["textFeatures"]): void;
  setMarkFeatures(font: FontSettingsState["markFeatures"]): void;
  setSegments(value: FontSettingsState["segments"]): void;
  setFontScale(value: FontSettingsState["fontScale"]): void;
  setDepth(value: FontSettingsState["depth"]): void;
}

export const useFontSettings = create<FontSettingsState & FontSettingsActions>(
  (set, get) => ({
    fonts: [],

    textFont: null as Font | null,
    markFont: null as Font | null,

    textFeatures: {},
    markFeatures: {},

    segments: 4,
    fontScale: 0.75,
    depth: 0.75,

    getFont(name: string) {
      const font = get().fonts.find((font) => font.fullName === name);

      if (font === undefined) {
        throw new Error(`Unknown font name "${name}"`);
      }

      return font;
    },

    setFonts: (fonts) => set({ fonts: [...get().fonts, ...fonts] }),

    setTextFont: (textFont) => set({ textFont }),
    setMarkFont: (markFont) => set({ markFont }),

    setTextFeatures: (textFeatures) => set({ textFeatures }),
    setMarkFeatures: (markFeatures) => set({ markFeatures }),

    setSegments: (segments) => set({ segments }),
    setFontScale: (fontScale) => set({ fontScale }),
    setDepth: (depth) => set({ depth }),
  })
);
