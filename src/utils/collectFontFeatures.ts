import { Font } from "fontkit";

const DEFAULT_FEATURES = [
  "rvrn",
  "ltra",
  "ltrm",
  "frac",
  "numr",
  "dnom",
  "ccmp",
  "locl",
  "rlig",
  "mark",
  "mkmk",
  "calt",
  "clig",
  "liga",
  "rclt",
  "curs",
  "kern",
];

export function collectFeatures(font: Font) {
  const result: Record<string, boolean> = {};

  for (const feature of font.availableFeatures) {
    result[feature] = DEFAULT_FEATURES.includes(feature);
  }

  return result;
}
