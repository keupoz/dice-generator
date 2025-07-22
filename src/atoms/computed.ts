import { createObserver, runWithObserver } from './observer'
import { readable } from './readable'
import { createValueRef } from './valueRef'

export function computed<TValue>(compute: () => TValue, cleanup?: (value: TValue) => void) {
  const observer = createObserver(notify)
  const ref = createValueRef(runWithObserver(observer, compute))
  const $computed = readable(ref)

  observer.linkedSource = $computed.observerSource

  function notify() {
    cleanup?.($computed.get())
    ref.value = runWithObserver(observer, compute)
  }

  return $computed
}
