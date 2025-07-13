export type AtomGetter = <TValue>(atom: ReadableAtom<TValue>) => TValue
export type AtomSetter = <TValue>(atom: WritableAtom<TValue>, value: TValue) => void

export type AtomListener<TValue> = (newValue: TValue, oldValue: TValue) => void
export type AtomImmediateListener<TValue> = (newValue: TValue, oldValue?: TValue) => void

export type Cleanup = () => void

export interface ReadableAtom<TValue> {
  /**
   * Get atom value
   * @returns Atom value
   */
  get: () => TValue

  /**
   * Subscribe to atom changes.
   * Doesn't run listener immediately.
   * @param listener Callback with new value and old value
   * @returns Function to unsubscribe
   */
  listen: (listener: AtomListener<TValue>) => Cleanup

  /**
   * Subscribe to atom changes.
   * Runs listener immediately.
   * @param listener Callback with new value and old value
   * @returns Function to unsubscribe
   */
  subscribe: (listener: AtomImmediateListener<TValue>) => Cleanup

  /**
   * Subscribe to one atom change.
   * Doesn't run immedieately.
   * Automatically unsubcscribes after first change.
   * @param listener Callback with new value and old value
   * @returns Function to unsubscribe
   */
  once: (listener: AtomListener<TValue>) => Cleanup
}

export interface WritableAtom<TValue> extends ReadableAtom<TValue> {
  /**
   * Set atom value
   * @param value Value to set
   */
  set: (value: TValue) => void
}
