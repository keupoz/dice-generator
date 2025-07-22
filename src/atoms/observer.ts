export interface ObserverSource {
  observers: Set<Observer>
}

export interface Observer {
  linkedSource?: ObserverSource
  sources: Set<ObserverSource>
  notify: () => void
}

export function createObserver(notify: Observer['notify']): Observer {
  return { sources: new Set(), notify }
}

let currentObserver: Observer | undefined

export function cleanupObserver(observer: Observer) {
  for (const source of observer.sources) {
    source.observers.delete(observer)
  }

  observer.sources.clear()
}

export function runWithObserver<T>(observer: Observer, run: () => T) {
  currentObserver = observer
  cleanupObserver(observer)

  try {
    return run()
  } finally {
    currentObserver = undefined
  }
}

export function getCurrentObserver() {
  return currentObserver
}
