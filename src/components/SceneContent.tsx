import { MaterialsContext } from "@/contexts";
import { useTheme } from "@/shadcn/components/theme-provider";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import {
  baseOpacityAtom,
  showGridAtom,
  smoothCameraAtom,
} from "@/stores/SceneSettingsStore";
import {
  focusObject,
  resetFocus,
  setCameraControls,
} from "@/utils/focusObject";
import { getFirstItem } from "@/utils/getFirstItem";
import { CameraControls, Grid, PerspectiveCamera } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";
import { useAtom } from "jotai";
import { FC, memo, useEffect, useMemo, useRef } from "react";
import {
  BoxHelper,
  DoubleSide,
  MeshLambertMaterial,
  MeshNormalMaterial,
  Object3D,
} from "three";
import { DieD10, DieD100 } from "./dice/DieD10";
import { DieD12 } from "./dice/DieD12";
import { DieD12R } from "./dice/DieD12R";
import { DieD2 } from "./dice/DieD2";
import { DieD20 } from "./dice/DieD20";
import { DieD3 } from "./dice/DieD3";
import { DieD4 } from "./dice/DieD4";
import { DieD4C } from "./dice/DieD4C";
import { DieD4I } from "./dice/DieD4I";
import { DieD4P } from "./dice/DieD4P";
import { DieD6 } from "./dice/DieD6";
import { DieD8 } from "./dice/DieD8";

export const SceneContent: FC = memo(() => {
  const invalidate = useThree((ctx) => ctx.invalidate);

  const baseMaterial = useMemo(() => {
    return new MeshLambertMaterial({ transparent: true });
  }, []);

  const fontMaterial = useMemo(() => {
    return new MeshNormalMaterial();
  }, []);

  const materialsContext = useMemo(() => {
    return { baseMaterial, fontMaterial };
  }, [baseMaterial, fontMaterial]);

  const setExportObject = useExportSettings((store) => store.setExportObject);

  const [showGrid] = useAtom(showGridAtom);
  const [smoothCamera] = useAtom(smoothCameraAtom);
  const [baseOpacity] = useAtom(baseOpacityAtom);

  const { isDark } = useTheme();

  const dividerColor = isDark ? 0x2f2f2f : 0x9f9f9f;

  useEffect(() => {
    baseMaterial.opacity = baseOpacity;
    baseMaterial.transparent = baseOpacity < 1;
    baseMaterial.needsUpdate = true;
    invalidate();
  }, [baseMaterial, baseOpacity, invalidate]);

  const helperRef = useRef<BoxHelper>(null);

  function focus(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();

    focusObject(getFirstItem(e.intersections).object);
  }

  function updateHighlight(e: ThreeEvent<PointerEvent>) {
    if (helperRef.current === null) return;

    helperRef.current.setFromObject(getFirstItem(e.intersections).object);
    helperRef.current.update();
    helperRef.current.visible = true;

    invalidate();
  }

  function hideHighlight() {
    if (helperRef.current === null) return;

    helperRef.current.visible = false;

    invalidate();
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={32}>
        <pointLight intensity={10000} />
      </PerspectiveCamera>

      <CameraControls
        ref={(value) => setCameraControls(value)}
        makeDefault
        draggingSmoothTime={smoothCamera ? 0.0625 : 0}
      />

      <ambientLight intensity={0.5} />

      <Grid
        visible={showGrid}
        args={[10, 10]}
        cellSize={1}
        cellThickness={1}
        cellColor={dividerColor}
        sectionSize={10}
        sectionThickness={1.5}
        sectionColor={dividerColor}
        fadeDistance={256}
        infiniteGrid
        side={DoubleSide}
      />

      <boxHelper
        ref={helperRef}
        args={[new Object3D(), "white"]}
        visible={false}
      />

      <MaterialsContext.Provider value={materialsContext}>
        <Flex
          ref={setExportObject}
          alignItems="center"
          justifyContent="center"
          dir="column-reverse"
          plane="xz"
          onPointerMove={updateHighlight}
          onPointerLeave={hideHighlight}
          onDoubleClick={focus}
          onPointerMissed={resetFocus}
        >
          <Box flexDirection="row">
            <DieD2 />
            <DieD3 />
            <DieD4 />
          </Box>

          <Box flexDirection="row">
            <DieD4C />
            <DieD4I />
            <DieD4P />
          </Box>

          <Box flexDirection="row">
            <DieD6 />
            <DieD8 />
            <DieD10 />
          </Box>

          <Box flexDirection="row">
            <DieD100 />
            <DieD12 />
            <DieD12R />
          </Box>

          <Box flexDirection="row">
            <DieD20 />
          </Box>
        </Flex>
      </MaterialsContext.Provider>
    </>
  );
});
