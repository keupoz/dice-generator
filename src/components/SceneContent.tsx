import type { ThreeEvent } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Box, Flex } from '@react-three/flex'
import { memo } from 'react'
import { setExportObject, useAppState } from '~/appState'
import { CAMERA_POSITION } from '~/consts'
import { DICE_GROUPED } from '~/dice/allDice'
import { focusObject, resetFocus, setCameraControls } from '~/utils/focusObject'
import { getFirstItem } from '~/utils/getFirstItem'
import { Die } from './dice/Die'
import { CameraControls } from './scene/CameraControls'
import { Grid } from './scene/Grid'
import { Highlighter } from './scene/Highlighter'

export const SceneContent = memo(() => {
  const smoothCamera = useAppState(state => state.smoothCamera)

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
    </>
  )
})
