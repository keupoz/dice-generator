import initManifold from 'manifold-3d'
import MANIFOLD_URL from 'manifold-3d/manifold.wasm?url'

export async function loadManifold() {
  const instance = await initManifold({ locateFile: () => MANIFOLD_URL })
  instance.setup()
  return instance
}
