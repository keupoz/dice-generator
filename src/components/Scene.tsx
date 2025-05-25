import type { ThreeEvent } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Box, Flex } from '@react-three/flex'
import { setExportObject } from '~/appState'
import { CAMERA_POSITION } from '~/consts'
import { DICE_GROUPED } from '~/dice/allDice'
import { MaterialsProvider } from '~/providers/MaterialsProvider'
import { focusObject, resetFocus } from '~/utils/focusObject'
import { getFirstItem } from '~/utils/getFirstItem'
import { Die } from './dice/Die'
import { Grid } from './scene/Grid'
import { Highlighter } from './scene/Highlighter'
import { SceneControls } from './scene/SceneControls'

export function Scene() {
  function focus(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation()

    focusObject(getFirstItem(e.intersections).object)
  }

  return (
    <Canvas frameloop="demand">
      <MaterialsProvider>
        <PerspectiveCamera makeDefault position={CAMERA_POSITION} />
        <SceneControls />

        <directionalLight position-z={32} position-y={32} />
        <directionalLight position-z={-32} position-y={32} />

        <ambientLight intensity={1} />

        <Grid />

        <Highlighter>
          {/* @ts-expect-error Outdated types of the lib */}
          <Flex
            ref={setExportObject}
            alignItems="center"
            justifyContent="center"
            dir="column-reverse"
            plane="xz"
            onDoubleClick={focus}
            onPointerMissed={resetFocus}
          >
            {DICE_GROUPED.map((group, i) => (
              // @ts-expect-error Outdated types of the lib
              // eslint-disable-next-line react/no-array-index-key
              <Box key={i} flexDirection="row">
                {group.map(info => (
                  <Die key={info.config.name} info={info} />
                ))}
              </Box>
            ))}
          </Flex>
        </Highlighter>
      </MaterialsProvider>
    </Canvas>
  )
}
