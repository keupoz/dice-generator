import type { Observer } from './observer'
import type { AtomGetter, ReadableAtom } from './types'
import { atom } from './atom'
import { runWithObserver } from './observer'

export function computed<TValue>(compute: (get: AtomGetter) => TValue, cleanup?: (value: TValue) => void) {
  function runCompute() {
    return compute(atom => atom.get())
  }

  const observer: Observer = {
    sources: new Set(),
    notify,
  }

  const $computed = atom(runWithObserver(observer, runCompute))

  observer.linkedSource = $computed.observerSource

  function notify() {
    cleanup?.($computed.get())
    $computed.set(runWithObserver(observer, runCompute))
  }

  return $computed as ReadableAtom<TValue>
}
