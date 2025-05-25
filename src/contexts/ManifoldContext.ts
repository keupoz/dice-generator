import type { ManifoldToplevel } from 'manifold-3d'
import initManifold from 'manifold-3d'
import MANIFOLD_URL from 'manifold-3d/manifold.wasm?url'
import { useEffect, useState } from 'react'
import { createContext } from '~/utils/createContext'

export const { useManifold, ManifoldProvider } = createContext('Manifold', () => {
  const [instance, setInstance] = useState<ManifoldToplevel | null>(null)

  useEffect(() => {
    initManifold({ locateFile: () => MANIFOLD_URL }).then((instance) => {
      instance.setup()
      setInstance(instance)
    })
  }, [])

  return instance
})
