import { asyncAtom } from 'atomous'
import { fetchFonts } from './fonts'
import { initManifold } from './manifold'

export const $resources = asyncAtom(() => {}, async () => {
  const [manifold, fonts] = await Promise.all([
    initManifold(),
    fetchFonts(),
  ])

  return { manifold, fonts }
})

export function getManifold() {
  const resources = $resources.get()

  if (resources.status !== 'success') throw new Error('Manifold is not ready')

  return resources.data.manifold
}
