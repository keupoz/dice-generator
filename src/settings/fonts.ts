import { getFirstItem } from "@/utils/getFirstItem";
import { InputBindingApi, ListItem } from "@tweakpane/core";
import { Font } from "fontkit";
import { onCleanup } from "solid-js";
import { Pane } from "tweakpane";
import { createListBlade } from "./list";

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

export function createFontSettings(
  pane: Pane,
  name: string,
  fonts: Font[],
  onFont: (font: Font) => void,
  onFeatures: (features: Record<string, boolean>) => void
) {
  let currentFont = getFirstItem(fonts);

  const variationInputs = new Map<string, InputBindingApi<unknown, number>>();
  const featureInputs = new Map<string, InputBindingApi<unknown, boolean>>();

  let variationSettings: Record<string, number> = {};
  let defaultVariationSettings: Record<string, number> = {};
  let features: Record<string, boolean> = {};

  const folder = pane.addFolder({ title: name });

  const fontFamilyBlade = createListBlade(
    folder,
    collectFontOptions(fonts),
    null,
    "Font family"
  );

  const fontVariationBlade = createListBlade(
    folder,
    collectFontVariations(currentFont),
    null,
    "Font variation"
  );

  const featureFolder = folder.addFolder({
    title: "Font features",
    expanded: false,
  });

  featureFolder.on("change", () => {
    onFeatures(features);
  });

  initVariationInputs(currentFont);
  initFeatureInputs(currentFont);

  fontVariationBlade.hidden = fontVariationBlade.options.length === 1;

  fontFamilyBlade.on("change", (e) => {
    const font = findFont(fonts, e.value);

    setFont(font);
  });

  fontVariationBlade.on("change", (e) => {
    setVariation(e.value);
  });

  function addFonts(newFonts: Font[]) {
    fonts = [...fonts, ...newFonts];

    fontFamilyBlade.options = collectFontOptions(fonts);

    setFont(getFirstItem(newFonts));
  }

  function setFont(font: Font) {
    currentFont = font;

    const value = getFontName(font);

    fontFamilyBlade.value = value;

    fontVariationBlade.options = collectFontVariations(font);
    fontVariationBlade.value = "Default";
    fontVariationBlade.hidden = fontVariationBlade.options.length === 1;

    variationInputs.forEach((input) => {
      input.dispose();
    });

    variationInputs.clear();

    variationSettings = {};
    defaultVariationSettings = {};

    initVariationInputs(font);

    onFont(font);
  }

  function initVariationInputs(font: Font) {
    for (const [name, axis] of Object.entries(font.variationAxes)) {
      variationSettings[name] = axis.default;
      defaultVariationSettings[name] = axis.default;

      const input = folder.addInput(variationSettings, name, {
        min: axis.min,
        max: axis.max,
        step: 1,
        label: axis.name,
      });

      input.on("change", handleVariations);

      variationInputs.set(name, input);
    }
  }

  function initFeatureInputs(font: Font) {
    featureInputs.forEach((input) => {
      input.dispose();
    });

    for (const feature of font.availableFeatures) {
      features[feature] = DEFAULT_FEATURES.includes(feature);

      const input = featureFolder.addInput(features, feature);

      featureInputs.set(feature, input);
    }

    featureFolder.hidden = featureInputs.size === 0;
  }

  function setVariation(name: string) {
    if (name === "Default") {
      setVariationSettings(defaultVariationSettings);
      onFont(currentFont);

      return;
    }

    const variation = currentFont.namedVariations[name];

    if (variation) {
      setVariationSettings(variation);
    }

    onFont(currentFont.getVariation(name));
  }

  function setVariationSettings(settings: Record<string, number>) {
    Object.assign(variationSettings, settings);

    variationInputs.forEach((input) => {
      input.refresh();
    });
  }

  function handleVariations() {
    const font = currentFont.getVariation(variationSettings);
    onFont(font);
  }

  onCleanup(() => {
    folder.dispose();
  });

  return { addFonts };
}

function getFontName(font: Font) {
  return font.fullName;
}

function findFont(fonts: Font[], name: string) {
  const result = fonts.find((font) => getFontName(font) === name);

  if (result === undefined) {
    throw new Error(`Unknown font name "${name}"`);
  }

  return result;
}

function collectFontOptions(fonts: Font[]) {
  return fonts.map<ListItem<string>>((font) => {
    const fontName = getFontName(font);

    return { value: fontName, text: fontName };
  });
}

function collectFontVariations(font: Font): ListItem<string>[] {
  return [
    { value: "Default", text: "Default" },
    ...Object.keys(font.namedVariations).map<ListItem<string>>((name) => {
      return { value: name, text: name };
    }),
  ];
}
