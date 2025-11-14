import { invalidate } from '@react-three/fiber'
import { DoubleSide, MeshNormalMaterial, MeshStandardMaterial } from 'three'
import { $baseOpacity, $enableWireframe } from './viewport'

export const BASE_MATERIAL = new MeshStandardMaterial({ transparent: true })
export const BLANK_MATERIAL = new MeshStandardMaterial({ side: DoubleSide })
export const FONT_MATERIAL = new MeshNormalMaterial()

$baseOpacity.subscribe((baseOpacity) => {
  BASE_MATERIAL.opacity = baseOpacity
  BASE_MATERIAL.transparent = baseOpacity < 1

  invalidate()
})

$enableWireframe.subscribe((enableWireframe) => {
  BASE_MATERIAL.wireframe = enableWireframe
  BLANK_MATERIAL.wireframe = enableWireframe
  FONT_MATERIAL.wireframe = enableWireframe

  invalidate()
})
