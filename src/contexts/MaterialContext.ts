import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { MeshLambertMaterial, MeshNormalMaterial } from 'three'
import { useAppState } from '~/appState'
import { createContext } from '~/utils/createContext'

export const { useMaterial, MaterialProvider } = createContext('Material', () => {
  const [baseMaterial] = useState(() => new MeshLambertMaterial({ transparent: true }))
  const [fontMaterial] = useState(() => new MeshNormalMaterial())
  const [result] = useState(() => ({ baseMaterial, fontMaterial }))

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
