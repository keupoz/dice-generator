import type { Object3D } from 'three'
import { CameraControls, Canvas, FocusControls, Lights } from '@keupoz/r3f-utils'
import { Center, PerspectiveCamera } from '@react-three/drei'
import { useAtom } from '~/atoms/useAtom'
import { $diceOutput, DICE } from '~/dice/allDice'
import { $currentDie, $currentDieFace } from '~/state/settings'
import { $smoothCamera } from '~/state/viewport'
import { AtomPrimitive } from './AtomPrimitive'
import { Grid } from './Grid'
import { SceneHooks } from './SceneHooks'

export function Scene() {
  const smoothCamera = useAtom($smoothCamera)

  function onFocus(object: Object3D | null) {
    if (!object) return

    const [category, name, ...rest] = object.name.split(':')

    if (category === 'die') {
      if (name) {
        const [type, partIndex] = rest
        const isNewDie = $currentDie.get() !== DICE[name]

        $currentDie.set(DICE[name])

        if (type === 'face') {
          const faceIndex = partIndex ? Number.parseInt(partIndex) : 0
          $currentDieFace.set(DICE[name]?.faces[faceIndex])
        } else if (isNewDie) {
          $currentDieFace.set(DICE[name]?.faces[0])
        }
      }
    }
  }

  return (
    <Canvas>
      <SceneHooks />

      <PerspectiveCamera makeDefault position={[112, 96, 112]} />
      <CameraControls draggingSmoothTime={smoothCamera ? 1 / 24 : 0} makeDefault />

      <Lights />
      <Grid />

      <FocusControls enableTransition={smoothCamera} resetToChildren onFocus={onFocus}>
        <Center top>
          <AtomPrimitive atom={$diceOutput} />
        </Center>
      </FocusControls>
    </Canvas>
  )
}
