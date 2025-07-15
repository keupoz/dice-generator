import type { AtomListener, WritableAtom } from './types'
import { enqueue } from './scheduler'

export function atom<TValue>(value: TValue) {
  const listeners = new Set<AtomListener>()

  const $atom: WritableAtom<TValue> = {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return
      value = newValue
      listeners.forEach(listener => enqueue(listener))
    },
    listen(listener) {
      listeners.add(listener)
      return () => void listeners.delete(listener)
    },
    once(listener) {
      const unsubcscribe = $atom.listen(() => {
        unsubcscribe()
        listener()
      })

      return unsubcscribe
    },
  }

  return $atom
}
