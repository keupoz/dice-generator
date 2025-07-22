import type { ObserverSource } from './observer'

export type Cleanup = () => void
export type AtomListener = () => Cleanup | void

export interface ReadableAtom<TValue> {
  observerSource: ObserverSource

  /**
   * Get atom value
   * @returns Atom value
   */
  get: () => TValue

  /**
   * Subscribe to atom changes.
   * @param listener Callback with new value and old value
   * @returns Function to unsubscribe
   */
  listen: (listener: AtomListener) => Cleanup
}

export interface WritableAtom<TValue> extends ReadableAtom<TValue> {
  /**
   * Set atom value
   * @param value Value to set
   */
  set: (value: TValue) => void
}
