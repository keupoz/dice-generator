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
import { cad2mesh } from "@/utils/3d/convert/cad2three";
import { measureDimensions } from "@jscad/modeling/src/measurements";
import { saveAs } from "file-saver";
import opentype, { Font } from "opentype.js";
import {
  Component,
  createEffect,
  createMemo,
  createResource,
  ErrorBoundary,
  JSX,
  mapArray,
  on,
  onMount,
  Show,
} from "solid-js";
import { Group, Mesh } from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";
import { RenderMode, RenderOperation } from "../dice/renderMode";
import { createBoolean } from "../hooks/controls/createBoolean";
import { createFolder } from "../hooks/controls/createFolder";
import { createPane } from "../hooks/controls/createPane";
import { createSelect } from "../hooks/controls/createSelect";
import { createSlider } from "../hooks/controls/createSlider";
import { createFontSelect } from "../hooks/createFontSelect";
import { createThree } from "../hooks/createThree";
import { BASE_MATERIAL, FONT_MATERIAL } from "../materials";

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
      const r = await fetch(url);
      const buffer = await r.arrayBuffer();
      const font = opentype.parse(buffer);

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
  const rootFolder = createPane("Settings");
  const sceneFolder = createFolder(rootFolder, "Scene options");

  const [showGrid] = createBoolean(sceneFolder, true, "Show grid");
  const [baseOpacity] = createSlider(
    sceneFolder,
    0.1,
    1,
    0.1,
    BASE_MATERIAL.opacity,
    "Base opacity"
  );

  createEffect(() => {
    BASE_MATERIAL.opacity = baseOpacity();
    render();
  });

  const [renderElement, addObjects, initRenderer, render] =
    createThree(showGrid);

  const dieFolder = createFolder(rootFolder, "Shared die options");

  const [textFont, addTextFonts] = createFontSelect(
    dieFolder,
    props.fonts,
    "Text font"
  );

  const [markFont, addMarkFonts] = createFontSelect(
    dieFolder,
    props.fonts,
    "Mark font"
  );

  useDropzone((buffers) => {
    const fonts = buffers.map((buffer) => {
      return opentype.parse(buffer);
    });

    addTextFonts(fonts);
    addMarkFonts(fonts);
  });

  const [fontScale] = createSlider(
    dieFolder,
    0.01,
    2,
    0.01,
    1,
    "Global font scale"
  );

  const [segments] = createSlider(dieFolder, 1, 24, 1, 4, "Font quality");

  const [depth] = createSlider(dieFolder, 0.01, 2, 0.01, 0.7, "Text depth");

  const [renderMode, setRenderMode] = createSelect<RenderMode>(
    sceneFolder,
    [
      { text: "Preview", value: "preview" },
      { text: "Render", value: "render" },
      { text: "STL", value: "stl" },
    ],
    "preview",
    "Render mode"
  );

  const [renderOperation] = createSelect<RenderOperation>(
    sceneFolder,
    [
      { text: "Subtract", value: "subtract" },
      { text: "Union", value: "union" },
    ],
    "subtract",
    "Render operation"
  );

  const exportButton = sceneFolder.addButton({ title: "Export STL" });

  const dieOptions: DieOptions = {
    folder: rootFolder,
    faceOptions: {
      textFont,
      markFont,
      fontScale,
      depth,
      segments,
    },
    renderMode,
    renderOperation,
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

  const dieGroups = dice.map((die) => {
    const dieGroup = new Group();

    const mesh = createMemo(() => {
      const geom = die.base();

      if (geom === null) return null;

      return cad2mesh(geom, BASE_MATERIAL);
    });

    const faces = mapArray(die.faces, (face) => {
      return cad2mesh(face, FONT_MATERIAL);
    });

    createEffect<Mesh | null>((prev) => {
      prev?.removeFromParent();

      const newMesh = mesh();

      if (newMesh === null) return null;

      dieGroup.add(newMesh);
      render();

      return newMesh;
    });

    createEffect<Mesh[]>((prev) => {
      prev.forEach((face) => face.removeFromParent());

      const newFaces = faces();

      dieGroup.add(...newFaces);
      render();

      return newFaces;
    }, []);

    createEffect(() => {
      const [fx, fy] = maxSize();

      dieGroup.position.set(die.x * fx, die.y * fy, 0);
    });

    return dieGroup;
  });

  const maxSize = createMemo<[number, number]>(() => {
    const [x, y] = dice.reduce<[number, number]>(
      (prev, die) => {
        const base = die.base();

        if (base === null) return prev;

        const [width, height] = measureDimensions(base);

        return [Math.max(prev[0], width), Math.max(prev[1], height)];
      },
      [0, 0]
    );

    return [x * 1.5, y * 1.25];
  });

  createEffect(on(maxSize, render));

  onMount(() => {
    initRenderer();

    const rootGroup = new Group();

    rootGroup.rotation.x = -Math.PI / 2;

    rootGroup.add(...dieGroups);
    addObjects(rootGroup);

    exportButton.on("click", () => {
      const prevMode = renderMode();

      setRenderMode("stl");

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

      setRenderMode(prevMode);
    });
  });

  return <div class="render-container">{renderElement}</div>;
};
