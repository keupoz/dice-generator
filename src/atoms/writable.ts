import type { WritableAtom } from './types'
import type { ValueRef } from './valueRef'
import { readable } from './readable'
import { enqueueObservers } from './scheduler'

export function writable<TValue>(ref: ValueRef<TValue>) {
  const $writable: WritableAtom<TValue> = {
    ...readable(ref),
    set(newValue) {
      if (newValue === ref.value) return
      ref.value = newValue
      enqueueObservers($writable.observerSource.observers)
    },
  }

  return $writable
}
