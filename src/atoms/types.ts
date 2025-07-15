export type AtomGetter = <TValue>(atom: ReadableAtom<TValue>) => TValue
export type AtomSetter = <TValue>(atom: WritableAtom<TValue>, value: TValue) => void

export type AtomListener = () => void
export type Cleanup = () => void

export interface ReadableAtom<TValue> {
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

  /**
   * Subscribe to one atom change.
   * Automatically unsubcscribes after first change.
   * @param listener Callback with new value and old value
   * @returns Function to unsubscribe
   */
  once: (listener: AtomListener) => Cleanup
}

export interface WritableAtom<TValue> extends ReadableAtom<TValue> {
  /**
   * Set atom value
   * @param value Value to set
   */
  set: (value: TValue) => void
}
