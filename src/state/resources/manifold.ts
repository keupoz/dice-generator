import loadManifold from 'manifold-3d'
import MANIFOLD_URL from 'manifold-3d/manifold.wasm?url'

export async function initManifold() {
  const instance = await loadManifold({ locateFile: () => MANIFOLD_URL })
  instance.setup()

  return instance
}
