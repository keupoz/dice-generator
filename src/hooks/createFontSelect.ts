import { ListItem } from "@tweakpane/core";
import { Font } from "fontkit";
import { Accessor, batch, createMemo, createSignal } from "solid-js";
import { FolderApi } from "tweakpane";
import { getFirstItem } from "../utils/getFirstItem";
import { createFolder } from "./controls/createFolder";
import { createImperativeSelect } from "./controls/createImperativeSelect";
import { createSelect } from "./controls/createSelect";

export type AddFonts = (fonts: Font[]) => void;
export type FontSelect = [Accessor<Font>, AddFonts];

export function createFontSelect(
  folder: FolderApi,
  defaultFonts: Font[],
  label: string
): FontSelect {
  folder = createFolder(folder, label, false);

  const [fonts, setFonts] = createSignal(defaultFonts);

  const fontsMap = createMemo(() => {
    const result = new Map<string, Font>();

    for (const font of fonts()) {
      result.set(getFontName(font), font);
    }

    return result;
  });

  const [currentFont, setCurrentFont] = createSignal(
    getFirstItem(defaultFonts)
  );

  const [setFontName, setFontNames] = createImperativeSelect(
    folder,
    collectFontNames(defaultFonts),
    getFontName(currentFont()),
    "Font family",
    (e) => {
      const font = fontsMap().get(e.value);

      if (font === undefined) {
        throw new Error(`Unknown font "${e.value}"`);
      }

      batch(() => {
        setCurrentFont(font);
        setVariations(collectVariations(font), "Default");
      });
    }
  );

  const [variation, _setVariation, setVariations] = createSelect(
    folder,
    collectVariations(currentFont()),
    null,
    "Font variation"
  );

  const finalFont = createMemo(() => {
    if (variation() === "Default") return currentFont();

    return currentFont().getVariation(variation());
  });

  const addFonts: AddFonts = (newFonts) => {
    batch(() => {
      setFonts((prev) => [...prev, ...newFonts]);

      const font = getFirstItem(newFonts);

      setFontNames(collectFontNames(fonts()));
      setVariations(collectVariations(font));

      setCurrentFont(font);
      setFontName(getFontName(font));
    });
  };

  return [finalFont, addFonts];
}

function collectFontNames(fonts: Font[]): ListItem<string>[] {
  return fonts.map((font) => {
    const name = font.fullName;

    return { text: name, value: name };
  });
}

function collectVariations(font: Font): ListItem<string>[] {
  return [
    { value: "Default", text: "Default" },

    ...Object.keys(font.namedVariations).map<ListItem<string>>((key) => {
      return { value: key, text: key };
    }),
  ];
}

function getFontName(font: Font) {
  return font.fullName;
}
