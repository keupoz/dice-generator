import { invalidate } from '@react-three/fiber'
import { DoubleSide, MeshNormalMaterial, MeshStandardMaterial } from 'three'
import { effect } from '~/atoms/effect'
import { $baseOpacity, $enableWireframe } from './viewport'

export const BASE_MATERIAL = new MeshStandardMaterial({ transparent: true })
export const BLANK_MATERIAL = new MeshStandardMaterial({ side: DoubleSide })
export const FONT_MATERIAL = new MeshNormalMaterial()

effect(() => {
  const baseOpacity = $baseOpacity.get()

  BASE_MATERIAL.opacity = baseOpacity
  BASE_MATERIAL.transparent = baseOpacity < 1

  invalidate()
})

effect(() => {
  const enableWireframe = $enableWireframe.get()

  BASE_MATERIAL.wireframe = enableWireframe
  BLANK_MATERIAL.wireframe = enableWireframe
  FONT_MATERIAL.wireframe = enableWireframe

  invalidate()
})
