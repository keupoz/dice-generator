import { cleanupObserver, createObserver, runWithObserver } from './observer'

export type EffectCleanup = () => void
export type EffectRun = () => EffectCleanup | void

export function effect(run: EffectRun): EffectCleanup {
  const observer = createObserver(notify)
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
