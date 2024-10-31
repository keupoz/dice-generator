import { Canvas } from '@react-three/fiber'
import { SceneContent } from './SceneContent'

export function Scene() {
  return (
    <Canvas frameloop="demand">
      <SceneContent />
    </Canvas>
  )
}
