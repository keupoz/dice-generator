import type { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { SceneContent } from './SceneContent'

export const Scene: FC = () => {
  return (
    <Canvas frameloop="demand">
      <SceneContent />
    </Canvas>
  )
}
