import type { AtomListener, WritableAtom } from './types'

export function atom<TValue>(value: TValue) {
  const listeners = new Set<AtomListener<TValue>>()

  const $atom: WritableAtom<TValue> = {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return

      const oldValue = value
      value = newValue

      const clonedListeners = [...listeners]
      clonedListeners.forEach(listener => listener(newValue, oldValue))
    },
    listen(listener) {
      listeners.add(listener)
      return () => void listeners.delete(listener)
    },
    subscribe(listener) {
      listener(value)
      return $atom.listen(listener)
    },
    once(listener) {
      const unsubcscribe = $atom.listen((newValue, oldValue) => {
        unsubcscribe()
        listener(newValue, oldValue)
      })

      return unsubcscribe
    },
  }

  return $atom
}
