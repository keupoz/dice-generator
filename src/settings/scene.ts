import { RenderMode, RenderOperation } from "@/dice/renderMode";
import { onCleanup } from "solid-js";
import { createMutable } from "solid-js/store";
import { Pane } from "tweakpane";

export interface SceneSettingsOptions {
  onExport: () => void;
}

export function createSceneSettings(pane: Pane, options: SceneSettingsOptions) {
  const settings = createMutable({
    showGrid: true,
    baseOpacity: 0.9,
    renderMode: "preview" as RenderMode,
    renderOperation: "subtract" as RenderOperation,
  });

  const folder = pane.addFolder({ title: "Scene settings" });

  folder.addInput(settings, "showGrid", { label: "Show grid" });

  folder.addInput(settings, "baseOpacity", {
    min: 0.1,
    max: 1,
    step: 0.1,
    label: "Base opacity",
  });

  folder.addInput(settings, "renderMode", {
    label: "Render mode",
    options: [
      { value: "preview", text: "Preview" },
      { value: "render", text: "Render" },
      { value: "stl", text: "STL" },
    ],
  });

  folder.addInput(settings, "renderOperation", {
    label: "Render operation",
    options: [
      { value: "subtract", text: "Subtract" },
      { value: "union", text: "Union" },
    ],
  });

  folder.addButton({ title: "Export STL" }).on("click", options.onExport);

  onCleanup(() => {
    folder.dispose();
  });

  return settings;
}
