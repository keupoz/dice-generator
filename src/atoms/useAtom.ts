import type { ReadableAtom } from './types'
import { useSyncExternalStore } from 'react'

export function useAtom<TValue>($atom: ReadableAtom<TValue>) {
  return useSyncExternalStore($atom.listen, $atom.get, $atom.get)
}
