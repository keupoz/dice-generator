import type { ManifoldToplevel } from 'manifold-3d'
import loadManifold from 'manifold-3d'
import MANIFOLD_URL from 'manifold-3d/manifold.wasm?url'

let instance: ManifoldToplevel | undefined

export function getManifold() {
  if (!instance) throw new Error('Manifold is not initialized')
  return instance
}

export async function initManifold() {
  instance = await loadManifold({ locateFile: () => MANIFOLD_URL })
  instance.setup()
}
