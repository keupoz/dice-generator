import { CameraControls, Canvas, FocusControls, Lights } from '@keupoz/r3f-utils'
import { Center, PerspectiveCamera } from '@react-three/drei'
import { $diceOutput } from '~/dice/allDice'
import { AtomPrimitive } from './AtomPrimitive'
import { Grid } from './Grid'
import { SceneHooks } from './SceneHooks'

export function Scene() {
  return (
    <Canvas>
      <SceneHooks />

      <PerspectiveCamera makeDefault position={[112, 96, 112]} />
      <CameraControls draggingSmoothTime={1 / 24} makeDefault />

      <Lights />
      <Grid />

      <FocusControls resetToChildren>
        <Center top>
          <AtomPrimitive atom={$diceOutput} />
        </Center>
      </FocusControls>
    </Canvas>
  )
}
