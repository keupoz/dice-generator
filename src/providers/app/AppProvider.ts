import { createLoaderProvider } from '~/utils/react/createLoaderProvider'
import { initCurrentFontsStore } from './initCurrentFontsStore'
import { initEvaluators } from './initEvaluators'
import { loadBuiltinFonts } from './loadBuiltinFonts'
import { loadManifold } from './loadManifold'

async function callAsync<T>(fn: () => T) {
  return fn()
}

export const [AppProvider, useApp] = createLoaderProvider(async (signal) => {
  const [builtInFonts, safeManifold] = await Promise.all([
    loadBuiltinFonts(signal),
    loadManifold(),
  ])

  const [evaluators, currentFontsStore] = await Promise.all([
    callAsync(() => initEvaluators(safeManifold)),
    callAsync(() => initCurrentFontsStore(builtInFonts)),
  ])

  return {
    builtInFonts,
    safeManifold,
    ...evaluators,
    currentFontsStore,
  }
})
