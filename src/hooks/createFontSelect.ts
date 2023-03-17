import { ListItem } from "@tweakpane/core";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";
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
  const fontsStorage = new Map<string, Font>();
  const options = createOptions(fonts, fontsStorage);
  const { value } = getFirstItem(options);

  const [signal, _setSignal, setOptions] = createSelect(
    folder,
    options,
    value,
    label
  );

  const addFonts: AddFonts = (fonts) => {
    const newOptions = createOptions(fonts, fontsStorage);
    options.push(...newOptions);

    setOptions(options, getFirstItem(newOptions).value);
  };

  const font = createMemo(() => {
    const fontName = signal();
    const font = fontsStorage.get(fontName);

    if (font === undefined) {
      throw new Error(`Unknown font "${fontName}"`);
    }

    return font;
  });

  return [font, addFonts];
}

function createOptions(fonts: Font[], storage: Map<string, Font>) {
  const result: ListItem<string>[] = [];

  for (const font of fonts) {
    const name = font.getEnglishName("fullName");

    if (storage.has(name)) continue;

    storage.set(name, font);

    result.push({ value: name, text: name });
  }

  return result;
}
