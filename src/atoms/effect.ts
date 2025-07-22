import type { Observer } from './observer'
import type { AtomGetter, Cleanup } from './types'
import { cleanupObserver, runWithObserver } from './observer'

export type EffectRun = (getter: AtomGetter) => Cleanup | void

export function effect(run: EffectRun): Cleanup {
  function runEffect() {
    return run(atom => atom.get())
  }

  const observer: Observer = {
    sources: new Set(),
    notify,
  }

  let effectCleanup = runWithObserver(observer, runEffect)

  function notify() {
    effectCleanup?.()
    effectCleanup = runWithObserver(observer, runEffect)
  }

  return () => {
    effectCleanup?.()
    cleanupObserver(observer)
  }
}
