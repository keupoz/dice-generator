import type { PropsWithChildren } from 'react'
import { createSafeContext } from './createSafeContext'

export function createProvider<T>(useValue: () => T) {
  const [Context, useContext] = createSafeContext<T>()

  function Provider({ children }: PropsWithChildren) {
    const value = useValue()

    return <Context value={value}>{children}</Context>
  }

  return [Provider, useContext] as const
}
