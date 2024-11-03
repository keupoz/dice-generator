import { Canvas } from '@react-three/fiber'
import { MaterialProvider } from '~/contexts/MaterialContext'
import { SceneContent } from './SceneContent'

export function Scene() {
  return (
    <Canvas frameloop="demand">
      <MaterialProvider>
        <SceneContent />
      </MaterialProvider>
    </Canvas>
  )
}
