import { useRef } from 'react'

export function useConst<T>(init: () => T): T {
  const ref = useRef<T>()

  if (!ref.current) {
    ref.current = init()
  }

  return ref.current
}
