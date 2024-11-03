import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, type ThreeEvent } from '@react-three/fiber'
import { Box, Flex } from '@react-three/flex'
import { setExportObject } from '~/appState'
import { CAMERA_POSITION } from '~/consts'
import { MaterialProvider } from '~/contexts/MaterialContext'
import { DICE_GROUPED } from '~/dice/allDice'
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
      <MaterialProvider>
        <PerspectiveCamera makeDefault position={CAMERA_POSITION} />
        <SceneControls />

        <directionalLight position-z={32} position-y={32} />
        <directionalLight position-z={-32} position-y={32} />

        <ambientLight intensity={1} />

        <Grid />

        <Highlighter>
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
              // eslint-disable-next-line react/no-array-index-key
              <Box key={i} flexDirection="row">
                {group.map(info => (
                  <Die key={info.config.name} info={info} />
                ))}
              </Box>
            ))}
          </Flex>
        </Highlighter>
      </MaterialProvider>
    </Canvas>
  )
}
