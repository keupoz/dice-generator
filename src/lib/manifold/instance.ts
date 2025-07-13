import type { SafeManifold } from './wrapManifoldModule'
import loadManifold from 'manifold-3d'
import MANIFOLD_URL from 'manifold-3d/manifold.wasm?url'
import { wrapManifoldModule } from './wrapManifoldModule'

let safeManifold: SafeManifold | undefined

export function getSafeManifold() {
  return safeManifold
}

export async function initManifold() {
  const instance = await loadManifold({ locateFile: () => MANIFOLD_URL })
  instance.setup()
  safeManifold = wrapManifoldModule(instance)
}
