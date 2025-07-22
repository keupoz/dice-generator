import type { Observer } from './observer'
import type { WritableAtom } from './types'
import { getCurrentObserver } from './observer'
import { enqueueObservers } from './scheduler'

export function atom<TValue>(value: TValue) {
  const $atom: WritableAtom<TValue> = {
    observerSource: {
      observers: new Set(),
    },
    get() {
      const currentObserver = getCurrentObserver()
      if (currentObserver) {
        $atom.observerSource.observers.add(currentObserver)
        currentObserver.sources.add($atom.observerSource)
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return
      value = newValue
      enqueueObservers($atom.observerSource.observers)
    },
    listen(listener) {
      const observer: Observer = {
        sources: new Set(),
        notify: listener,
      }

      $atom.observerSource.observers.add(observer)
      observer.sources.add($atom.observerSource)

      return () => {
        $atom.observerSource.observers.delete(observer)
        observer.sources.delete($atom.observerSource)
      }
    },
  }

  return $atom
}
