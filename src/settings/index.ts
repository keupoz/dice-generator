import { getFirstItem } from "@/utils/getFirstItem";
import { Font } from "fontkit";
import { onCleanup } from "solid-js";
import { createMutable } from "solid-js/store";
import { Pane } from "tweakpane";
import { createGlobalDiceSettings } from "./diceGlobal";
import { createFontSettings } from "./fonts";
import { createSceneSettings, SceneSettingsOptions } from "./scene";

export function createSettings(
  sceneOptions: SceneSettingsOptions,
  fonts: Font[]
) {
  const pane = new Pane({ title: "Settings" });

  onCleanup(() => {
    pane.dispose();
  });

  const sceneSettings = createSceneSettings(pane, sceneOptions);
  const globalDiceSettings = createGlobalDiceSettings(pane);

  const fontsSettings = createMutable({
    textFont: getFirstItem(fonts),
    textFeatures: {} as Record<string, boolean>,

    markFont: getFirstItem(fonts),
    markFeatures: {} as Record<string, boolean>,
  });

  const { addFonts: addTextFonts } = createFontSettings(
    pane,
    "Text font",
    fonts,
    (font) => {
      fontsSettings.textFont = font;
    },
    (features) => {
      fontsSettings.textFeatures = { ...features };
    }
  );

  const { addFonts: addMarkFonts } = createFontSettings(
    pane,
    "Mark font",
    fonts,
    (font) => {
      fontsSettings.markFont = font;
    },
    (features) => {
      fontsSettings.markFeatures = { ...features };
    }
  );

  function addFonts(newFonts: Font[]) {
    addTextFonts(newFonts);
    addMarkFonts(newFonts);
  }

  return {
    pane,
    sceneSettings,
    globalDiceSettings,
    fontsSettings,
    addFonts,
  };
}
