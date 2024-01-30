import { Font } from "fontkit";
import { Path } from "three";
import { create } from "zustand";

export interface SVGInfo {
  id: number;
  name: string;
  lastModified: number;
  fileSize: number;
  raw: string;
  paths: Path[];
  scaleByViewbox: boolean;
  viewboxScale: number | null;
}

interface FontsStoreState {
  fonts: Font[];
  svgs: SVGInfo[];
}

interface FontSettingsState {
  textFont: Font | null;
  markFont: Font | null;
  textFeatures: Record<string, boolean>;
  markFeatures: Record<string, boolean>;
  segments: number;
  fontScale: number;
  svgScale: number;
  depth: number;
}

export const useFontsStore = create<FontsStoreState>(() => ({
  fonts: [],
  svgs: [],
}));

export const useFontSettings = create<FontSettingsState>(() => ({
  textFont: null as Font | null,
  markFont: null as Font | null,

  textFeatures: {},
  markFeatures: {},

  segments: 4,
  fontScale: 0.75,
  svgScale: 0.75,
  depth: 0.75,
}));

export function getFont(name: string) {
  const fonts = useFontsStore.getState().fonts;
  const font = fonts.find((font) => font.fullName === name);

  if (font === undefined) {
    throw new Error(`Unknown font name "${name}"`);
  }

  return font;
}
