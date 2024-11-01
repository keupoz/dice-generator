import type { ThreeEvent } from '@react-three/fiber'
import { useComputedColorScheme, useMantineTheme } from '@mantine/core'
import { Grid, PerspectiveCamera } from '@react-three/drei'
import { Box, Flex } from '@react-three/flex'
import { memo, useLayoutEffect } from 'react'
import { BackSide } from 'three'
import { setExportObject, useAppState } from '~/appState'
import { CAMERA_POSITION } from '~/consts'
import { useHighlight } from '~/hooks/useHighlight'
import { BASE_MATERIAL, FONT_MATERIAL } from '~/materials'
import { focusObject, resetFocus, setCameraControls } from '~/utils/focusObject'
import { getFirstItem } from '~/utils/getFirstItem'
import { DieD2 } from './dice/DieD2'
import { DieD3 } from './dice/DieD3'
import { DieD4 } from './dice/DieD4'
import { DieD4C } from './dice/DieD4C'
import { DieD4I } from './dice/DieD4I'
import { DieD4P } from './dice/DieD4P'
import { DieD6 } from './dice/DieD6'
import { DieD8 } from './dice/DieD8'
import { DieD10, DieD100 } from './dice/DieD10'
import { DieD12 } from './dice/DieD12'
import { DieD12R } from './dice/DieD12R'
import { DieD20 } from './dice/DieD20'
import { CameraControls } from './scene/CameraControls'

export const SceneContent = memo(() => {
  const showGrid = useAppState(state => state.showGrid)
  const smoothCamera = useAppState(state => state.smoothCamera)
  const baseOpacity = useAppState(state => state.baseOpacity)
  const enableWireframe = useAppState(state => state.enableWireframe)

  const colorScheme = useComputedColorScheme()
  const { colors } = useMantineTheme()
  const dividerColor = colorScheme === 'dark' ? colors.dark[4] : colors.gray[2]

  const { highlight, updateHighlight, hideHighlight } = useHighlight()

  useLayoutEffect(() => {
    BASE_MATERIAL.opacity = baseOpacity
    BASE_MATERIAL.transparent = baseOpacity < 1
    BASE_MATERIAL.needsUpdate = true
  }, [baseOpacity])

  useLayoutEffect(() => {
    BASE_MATERIAL.wireframe = enableWireframe
    FONT_MATERIAL.wireframe = enableWireframe
  }, [baseOpacity, enableWireframe])

  function focus(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation()

    focusObject(getFirstItem(e.intersections).object)
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={CAMERA_POSITION} />

      <directionalLight position-z={32} position-y={32} />
      <directionalLight position-z={-32} position-y={32} />

      <ambientLight intensity={1} />

      <CameraControls
        ref={setCameraControls}
        makeDefault
        draggingSmoothTime={smoothCamera ? 0.0625 : 0}
      />

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
        side={BackSide}
      />

      <primitive object={highlight} />

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
    </>
  )
})
