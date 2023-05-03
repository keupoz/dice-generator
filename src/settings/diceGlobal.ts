import { onCleanup } from "solid-js";
import { createMutable } from "solid-js/store";
import { Pane } from "tweakpane";

export function createGlobalDiceSettings(pane: Pane) {
  const settings = createMutable({
    fontScale: 1,
    fontQuality: 4,
    fontDepth: 0.7,
  });

  const folder = pane.addFolder({ title: "Global dice settings" });

  folder.addInput(settings, "fontScale", {
    label: "Font scale",
    min: 0.01,
    max: 2,
    step: 0.01,
  });

  folder.addInput(settings, "fontQuality", {
    label: "Font quality",
    min: 1,
    max: 24,
    step: 1,
  });

  folder.addInput(settings, "fontDepth", {
    label: "Font depth",
    min: 0.01,
    max: 2,
    step: 0.01,
  });

  onCleanup(() => {
    folder.dispose();
  });

  return settings;
}
