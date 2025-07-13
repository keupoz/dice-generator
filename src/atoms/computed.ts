import type { AtomGetter, ReadableAtom } from './types'
import { atom } from './atom'
import { effect } from './effect'

export type ComputedInit<TValue> = (get: AtomGetter) => TValue

export function computed<TValue>(init: ComputedInit<TValue>, autoBatch = true) {
  const $computed = atom<TValue | undefined>(undefined)

  effect((get) => {
    $computed.set(init(get))
  }, autoBatch)

  return $computed as ReadableAtom<TValue>
}
