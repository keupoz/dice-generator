import { ListItem } from "@tweakpane/core";
import opentype, { Font } from "opentype.js";
import { createEffect, createMemo, createResource } from "solid-js";
import { FolderApi } from "tweakpane";
import { getFirstItem } from "../utils/getFirstItem";
import { GoogleFont, GoogleFonts } from "../utils/loadGoogleFonts";
import { createFolder } from "./controls/createFolder";
import { createSelect } from "./controls/createSelect";

export function createGoogleFontSelect(
  folder: FolderApi,
  fontsInfo: GoogleFonts
) {
  const categories = new Map<string, Map<string, GoogleFont>>();

  for (const font of fontsInfo.items) {
    const category = getCategory(categories, font.category);

    category.set(font.family, font);
  }

  folder = createFolder(folder, "Google fonts");

  const categoriesList: ListItem<string>[] = [];

  for (const [key] of categories) {
    categoriesList.push({ value: key, text: key });
  }

  const [categorySignal] = createSelect(
    folder,
    categoriesList,
    getFirstItem(categoriesList).value,
    "Category"
  );

  const currentCategory = createMemo(() => {
    const category = categories.get(categorySignal());

    if (category === undefined) {
      throw new Error(`Unknown category "${categorySignal()}"`);
    }

    return category;
  });

  const fontsList = createMemo(() => {
    const result: ListItem<string>[] = [];

    for (const [key] of currentCategory()) {
      result.push({ value: key, text: key });
    }

    return result;
  });

  const [fontSignal, _setFont, setFontOptions] = createSelect(
    folder,
    fontsList(),
    getFirstItem(fontsList()).value,
    "Font family"
  );

  createEffect(() => {
    setFontOptions(fontsList(), getFirstItem(fontsList()).value);
  });

  const currentFont = createMemo(() => {
    const font = currentCategory().get(fontSignal());

    if (font === undefined) {
      throw new Error(
        `Unknown font family "${fontSignal()}" in category "${categorySignal()}"`
      );
    }

    return font;
  });

  const stylesList = createMemo(() => {
    const font = currentFont();

    return Object.keys(font.files).map<ListItem<string>>((key) => {
      return { value: key, text: key };
    });
  });

  const [styleSignal, , setStyleOptions] = createSelect(
    folder,
    stylesList(),
    getFirstItem(stylesList()).value,
    "Font style"
  );

  createEffect(() => {
    setStyleOptions(stylesList(), getFirstItem(stylesList()).value);
  });

  const currentUrl = createMemo(() => {
    const url = currentFont().files[styleSignal()];

    if (url === undefined) {
      throw new Error(
        `Unknown style "${styleSignal()}" in font "${fontSignal()}"`
      );
    }

    return url;
  });

  const cache = new Map<string, Font>();

  const [finalFont] = createResource(currentUrl, async (url) => {
    const cached = cache.get(url);

    if (cached !== undefined) return cached;

    const r = await fetch(url);
    const arrayBuffer = await r.arrayBuffer();
    const font = opentype.parse(arrayBuffer);

    cache.set(url, font);

    return font;
  });

  return finalFont;
}

function getCategory(
  categories: Map<string, Map<string, GoogleFont>>,
  name: string
): Map<string, GoogleFont> {
  let category = categories.get(name);

  if (category === undefined) {
    category = new Map();
    categories.set(name, category);
  }

  return category;
}
