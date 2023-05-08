import { DieOptions } from "@/dice/createDie";
import { createD10 } from "@/dice/shapes/d10";
import { createD12 } from "@/dice/shapes/d12";
import { createD12r } from "@/dice/shapes/d12r";
import { createD2 } from "@/dice/shapes/d2";
import { createD20 } from "@/dice/shapes/d20";
import { createD3 } from "@/dice/shapes/d3";
import { createD4 } from "@/dice/shapes/d4";
import { createD4C } from "@/dice/shapes/d4c";
import { createD4I } from "@/dice/shapes/d4i";
import { createD4P } from "@/dice/shapes/d4p";
import { createD6 } from "@/dice/shapes/d6";
import { createD8 } from "@/dice/shapes/d8";
import { useDropzone } from "@/hooks/useDropzone";
import { createSettings } from "@/settings";
import vec3 from "@jscad/modeling/src/maths/vec3";
import { Buffer } from "buffer";
import { saveAs } from "file-saver";
import { create as createFont, Font } from "fontkit";
import {
  Component,
  createEffect,
  createMemo,
  createResource,
  ErrorBoundary,
  JSX,
  onMount,
  Show,
} from "solid-js";
import { Group, Object3D } from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";
import { createThree } from "../hooks/createThree";
import { BASE_MATERIAL } from "../materials";

const LOCAL_FONTS = import.meta.glob("@/fonts/*.ttf", {
  eager: true,
  as: "url",
});

const FONTS = [
  // Roboto Regular
  "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",

  // Roboto SLab
  "https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaG5iddG-1A.ttf",

  // Lobster
  "https://fonts.gstatic.com/s/lobster/v28/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",

  // Righteous
  "https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",

  // Edu NSW ACT Foundation
  "https://fonts.gstatic.com/s/edunswactfoundation/v2/raxRHjqJtsNBFUi8WO0vUBgc9D-2lV_oQdCAYlt_QTQ0vUxJki9tovGLeC-sfguJ.ttf",

  // Material Symbols Rounded
  "https://fonts.gstatic.com/s/materialsymbolsrounded/v106/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDJ_vb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOc7TOVpeRL2w5rwZu2rIelXxc.woff2",

  ...Object.values(LOCAL_FONTS),
];

function handleError(err: unknown): JSX.Element {
  console.error(err);

  if (err instanceof Error) {
    return `${err.name}: ${err.message}`;
  }

  return String(err);
}

export const App: Component = () => {
  const [fonts] = createResource(async () => {
    const localFonts = FONTS.map(async (url) => {
      const r = await fetch(url, { cache: "force-cache" });
      const arrayBuffer = await r.arrayBuffer();
      const font = createFont(Buffer.from(arrayBuffer));

      return font;
    });

    return Promise.all(localFonts);
  });

  return (
    <ErrorBoundary fallback={handleError}>
      <Show when={fonts()} fallback="Loading ..." keyed>
        {(localFonts) => <AppInternal fonts={localFonts} />}
      </Show>
    </ErrorBoundary>
  );
};

interface AppInternalProps {
  fonts: Font[];
}

const AppInternal: Component<AppInternalProps> = (props) => {
  const settings = createSettings(
    {
      onExport() {
        const prevMode = settings.sceneSettings.renderMode;

        settings.sceneSettings.renderMode = "stl";

        rootGroup.rotation.x = 0;
        rootGroup.updateWorldMatrix(true, true);

        const exporter = new STLExporter();
        const result = exporter.parse(rootGroup, {
          binary: true,
        }) as unknown as DataView;

        rootGroup.rotation.x = -Math.PI / 2;

        const date = new Date();

        let timestamp = `${date.getFullYear()}`.padStart(4, "0");
        timestamp += "-" + `${date.getMonth()}`.padStart(2, "0");
        timestamp += "-" + `${date.getDate()}`.padStart(2, "0");
        timestamp += "_" + `${date.getHours()}`.padStart(2, "0");
        timestamp += "-" + `${date.getMinutes()}`.padStart(2, "0");
        timestamp += "-" + `${date.getSeconds()}`.padStart(2, "0");

        saveAs(new Blob([result]), `dice-${timestamp}.stl`);

        settings.sceneSettings.renderMode = prevMode;
      },
    },
    props.fonts
  );

  const rootFolder = settings.pane;

  createEffect(() => {
    BASE_MATERIAL.opacity = settings.sceneSettings.baseOpacity;
    render();
  });

  const [renderElement, addObjects, initRenderer, render] = createThree(
    () => settings.sceneSettings.showGrid
  );

  useDropzone((arrayBuffers) => {
    const fonts = arrayBuffers.map((arrayBuffer) => {
      return createFont(Buffer.from(arrayBuffer));
    });

    settings.addFonts(fonts);
  });

  const dieOptions: DieOptions = {
    folder: rootFolder,
    faceOptions: {
      textFont: () => settings.fontsSettings.textFont,
      textFeatures: () => settings.fontsSettings.textFeatures,

      markFont: () => settings.fontsSettings.markFont,
      markFeatures: () => settings.fontsSettings.markFeatures,

      fontScale: () => settings.globalDiceSettings.fontScale,
      depth: () => settings.globalDiceSettings.fontDepth,
      segments: () => settings.globalDiceSettings.fontQuality,
    },
    renderMode: () => settings.sceneSettings.renderMode,
    renderOperation: () => settings.sceneSettings.renderOperation,
  };

  const dice = [
    createD2(1, -1, dieOptions),
    createD3(-1, -2, dieOptions),
    createD4(0, -1, dieOptions),
    createD4C(-1, -1, dieOptions),
    createD4P(0, -2, dieOptions),
    createD4I(1, -2, dieOptions),
    createD6(0, 0, dieOptions),
    createD8(0, 1, dieOptions),
    createD10(-1, 1, dieOptions),
    createD10(-1, 0, dieOptions, true),
    createD12(1, 1, dieOptions),
    createD12r(0, 2, dieOptions),
    createD20(1, 0, dieOptions),
  ];

  const maxSize = createMemo(() => {
    const result = vec3.create();

    for (const die of dice) {
      const dimensions = die.dimensions();

      vec3.max(result, result, dimensions);
    }

    return result;
  });

  for (const die of dice) {
    createEffect<Object3D | null>((prev) => {
      prev?.removeFromParent();

      const object = die.result();

      if (object) {
        const [x, y] = maxSize();
        object.position.x = die.x * x * 1.5;
        object.position.y = die.y * y * 1.25;
        rootGroup.add(object);
      }

      render();

      return object;
    });
  }

  const rootGroup = new Group();
  rootGroup.rotation.x = -Math.PI / 2;

  onMount(() => {
    initRenderer();
    addObjects(rootGroup);
  });

  return <div class="render-container">{renderElement}</div>;
};
