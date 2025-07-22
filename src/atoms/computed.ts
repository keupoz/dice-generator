import { createObserver, runWithObserver, safeRunWithObserver } from './observer'
import { readable } from './readable'
import { createValueRef } from './valueRef'

export function computed<TValue>(compute: () => TValue, cleanup?: (value: TValue) => void) {
  const observer = createObserver(notify)
  const ref = createValueRef(runWithObserver(observer, compute))
  const $computed = readable(ref)

  observer.linkedSource = $computed.observerSource

  function notify() {
    cleanup?.($computed.get())
    ref.value = safeRunWithObserver(observer, compute, ref.value)
  }

  return $computed
}
