import type { Observer } from './observer'
import type { ReadableAtom, ValueRef } from './types'
import { getCurrentObserver } from './observer'

export function readable<TValue>(ref: ValueRef<TValue>) {
  const $readable: ReadableAtom<TValue> = {
    observerSource: {
      observers: new Set(),
    },
    get() {
      const currentObserver = getCurrentObserver()
      if (currentObserver) {
        $readable.observerSource.observers.add(currentObserver)
        currentObserver.sources.add($readable.observerSource)
      }
      return ref.value
    },
    listen(listener) {
      const observer: Observer = {
        sources: new Set(),
        notify: listener,
      }

      $readable.observerSource.observers.add(observer)
      observer.sources.add($readable.observerSource)

      return () => {
        $readable.observerSource.observers.delete(observer)
        observer.sources.delete($readable.observerSource)
      }
    },
  }

  return $readable
}
