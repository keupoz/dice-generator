import type { Observer } from './observer'

type Callback = () => void

const callbacks = new Set<Callback>()

export function enqueueObservers(observers: Iterable<Observer>) {
  for (const observer of observers) {
    enqueue(observer.notify)

    if (observer.linkedSource) {
      enqueueObservers(observer.linkedSource.observers)
    }
  }
}

export function enqueue(callback: Callback) {
  callbacks.delete(callback)
  callbacks.add(callback)
  if (callbacks.size === 1) queueMicrotask(flush)
}

export function flush() {
  for (const callback of callbacks) {
    callback()
  }

  callbacks.clear()
}
