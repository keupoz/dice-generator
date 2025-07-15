import type { AtomGetter, Cleanup, ReadableAtom } from './types'

export type EffectRun = (get: AtomGetter) => Cleanup | void

export function effect(fx: EffectRun): Cleanup {
  const collectedAtoms = new Set<ReadableAtom<unknown>>()

  let unbinds: Cleanup[] | undefined
  let effectCleanup: Cleanup | undefined

  runEffect()

  function cleanup() {
    unbinds?.forEach(unbind => unbind())
    effectCleanup?.()

    unbinds = undefined
    effectCleanup = undefined
  }

  function runEffect() {
    try {
      effectCleanup = fx(getter) ?? undefined
    } finally {
      // Subscribe to new dependencies
      unbinds = [...collectedAtoms].map(atom => atom.listen(run))
      collectedAtoms.clear()
    }
  }

  function run() {
    cleanup()
    runEffect()
  }

  function getter<UValue>($atom: ReadableAtom<UValue>) {
    // Collect dependency
    collectedAtoms.add($atom)
    return $atom.get()
  }

  return cleanup
}
