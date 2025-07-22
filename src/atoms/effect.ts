import type { Observer } from './observer'
import type { Cleanup } from './types'
import { cleanupObserver, runWithObserver } from './observer'

export type EffectRun = () => Cleanup | void

export function effect(run: EffectRun): Cleanup {
  const observer: Observer = {
    sources: new Set(),
    notify,
  }

  let effectCleanup = runWithObserver(observer, run)

  function notify() {
    effectCleanup?.()
    effectCleanup = runWithObserver(observer, run)
  }

  return () => {
    effectCleanup?.()
    cleanupObserver(observer)
  }
}
