import type { AtomGetter, Cleanup, ReadableAtom } from './types'
import { atom } from './atom'

export const $pending = atom(false)

export type EffectRun = (get: AtomGetter) => Cleanup | void

export function effect(fx: EffectRun, autoBatch = true): Cleanup {
  let unbinds: Cleanup[] = []
  let timer: number | undefined
  let runCleanup = fx(getter) ?? undefined

  function cleanup() {
    runCleanup?.()
    unbinds.forEach(unbind => unbind())
    unbinds = []
  }

  function run() {
    cleanup()
    runCleanup = fx(getter) ?? undefined
    $pending.set(false)
  }

  function batch() {
    $pending.set(true)
    clearTimeout(timer)
    if (unbinds.length === 1 || !autoBatch) return run()
    timer = setTimeout(run, 1, undefined)
  }

  function getter<UValue>($atom: ReadableAtom<UValue>) {
    unbinds.push($atom.listen(batch))
    return $atom.get()
  }

  return cleanup
}
