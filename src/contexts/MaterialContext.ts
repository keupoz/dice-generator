import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { MeshLambertMaterial, MeshNormalMaterial } from 'three'
import { useAppState } from '~/appState'
import { useConst } from '~/hooks/useConst'
import { createContext } from '~/utils/createContext'

export const { useMaterial, MaterialProvider } = createContext('Material', () => {
  const baseMaterial = useConst(() => new MeshLambertMaterial({ transparent: true }))
  const fontMaterial = useConst(() => new MeshNormalMaterial())
  const result = useConst(() => ({ baseMaterial, fontMaterial }))

  const baseOpacity = useAppState(state => state.baseOpacity)
  const enableWireframe = useAppState(state => state.enableWireframe)

  const invalidate = useThree(state => state.invalidate)

  useEffect(() => {
    baseMaterial.opacity = baseOpacity
    baseMaterial.transparent = baseOpacity < 1
    baseMaterial.needsUpdate = true

    invalidate()
  }, [baseMaterial, baseOpacity, invalidate])

  useEffect(() => {
    baseMaterial.wireframe = enableWireframe
    fontMaterial.wireframe = enableWireframe

    invalidate()
  }, [baseMaterial, enableWireframe, fontMaterial, invalidate])

  return result
})
