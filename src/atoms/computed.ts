import type { Observer } from './observer'
import type { ValueRef } from './types'
import { runWithObserver } from './observer'
import { readable } from './readable'

export function computed<TValue>(compute: () => TValue, cleanup?: (value: TValue) => void) {
  const observer: Observer = {
    sources: new Set(),
    notify,
  }

  const ref: ValueRef<TValue> = { value: runWithObserver(observer, compute) }
  const $computed = readable(ref)

  observer.linkedSource = $computed.observerSource

  function notify() {
    cleanup?.($computed.get())
    ref.value = runWithObserver(observer, compute)
  }

  return $computed
}
