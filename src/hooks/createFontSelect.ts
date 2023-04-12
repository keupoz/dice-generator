import { ListItem } from "@tweakpane/core";
import { Font } from "fontkit";
import { Accessor, createEffect, createMemo } from "solid-js";
import { FolderApi } from "tweakpane";
import { getFirstItem } from "../utils/getFirstItem";
import { createSelect } from "./controls/createSelect";

export type AddFonts = (fonts: Font[]) => void;
export type FontSelect = [Accessor<Font>, AddFonts];

export function createFontSelect(
  folder: FolderApi,
  fonts: Font[],
  label: string
): FontSelect {
  debugFonts(fonts);

  const fontsStorage = new Map<string, Font>();

  const fontOptions = createOptions(fonts, fontsStorage);
  const { value: fontValue } = getFirstItem(fontOptions);

  const [fontSignal, _setFontSignal, setFontOptions] = createSelect(
    folder,
    fontOptions,
    fontValue,
    label
  );

  const variationOptions = createVariationOptions(getFirstItem(fonts));
  const { value: variationValue } = getFirstItem(variationOptions);

  const [variationSignal, _setVariationSignal, setVariationOptions] =
    createSelect(
      folder,
      variationOptions,
      variationValue,
      `${label} variation`
    );

  const addFonts: AddFonts = (fonts) => {
    const newOptions = createOptions(fonts, fontsStorage);
    fontOptions.push(...newOptions);

    setFontOptions(fontOptions, getFirstItem(newOptions).value);

    debugFonts(fonts);
  };

  const defaultFont = createMemo(() => {
    const fontName = fontSignal();
    const font = fontsStorage.get(fontName);

    if (font === undefined) {
      throw new Error(`Unknown font "${fontName}"`);
    }

    return font;
  });

  createEffect(() => {
    const variationOptions = createVariationOptions(defaultFont());
    setVariationOptions(variationOptions);
  });

  const font = createMemo(() => {
    if (variationSignal() === "Default") return defaultFont();

    console.log(
      variationSignal(),
      defaultFont().namedVariations[variationSignal()]
    );

    return defaultFont().getVariation(variationSignal());
  });

  return [font, addFonts];
}

function createOptions(fonts: Font[], storage: Map<string, Font>) {
  const result: ListItem<string>[] = [];

  for (const font of fonts) {
    const name = font.fullName;

    if (storage.has(name)) continue;

    storage.set(name, font);

    result.push({ value: name, text: name });
  }

  return result;
}

function createVariationOptions(font: Font): ListItem<string>[] {
  return [
    { value: "Default", text: "Default" },

    ...Object.keys(font.namedVariations).map<ListItem<string>>((key) => {
      return { value: key, text: key };
    }),
  ];
}

function debugFonts(fonts: Font[]) {
  for (const font of fonts) {
    console.log(font.fullName, font, font.variationAxes);
  }
}
