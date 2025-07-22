import type { Observer } from './observer'
import type { ReadableAtom } from './types'
import { atom } from './atom'
import { runWithObserver } from './observer'

export function computed<TValue>(compute: () => TValue, cleanup?: (value: TValue) => void) {
  const observer: Observer = {
    sources: new Set(),
    notify,
  }

  const $computed = atom(runWithObserver(observer, compute))

  observer.linkedSource = $computed.observerSource

  function notify() {
    cleanup?.($computed.get())
    $computed.set(runWithObserver(observer, compute))
  }

  return $computed as ReadableAtom<TValue>
}
