import { invalidate } from '@react-three/fiber'
import { MeshNormalMaterial, MeshStandardMaterial } from 'three'
import { effect } from '~/atoms/effect'
import { $baseOpacity, $enableWireframe } from './viewport'

export const BASE_MATERIAL = new MeshStandardMaterial({ transparent: true })
export const FONT_MATERIAL = new MeshNormalMaterial()

effect((get) => {
  const baseOpacity = get($baseOpacity)

  BASE_MATERIAL.opacity = baseOpacity
  BASE_MATERIAL.transparent = baseOpacity < 1

  invalidate()
})

effect((get) => {
  const enableWireframe = get($enableWireframe)

  BASE_MATERIAL.wireframe = enableWireframe
  FONT_MATERIAL.wireframe = enableWireframe

  invalidate()
})
