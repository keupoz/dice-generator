import type { FC, PropsWithChildren } from 'react'
import type { Prettify } from './types'
import { LoadingOverlay } from '@mantine/core'
import { createContext as createReactContext, use } from 'react'

export type CreateContextResult<T, Name extends string> = Prettify<{
  [HookName in `use${Name}`]: () => T;
} & {
  [ProviderName in `${Name}Provider`]: FC<PropsWithChildren>
}>

export function createContext<T, Name extends string>(name: Name, useValue: () => T | null) {
  const Context = createReactContext<T | null>(null)

  function useContext() {
    const value = use(Context)

    if (value === null) {
      throw new Error(`${name}: context is not initialized`)
    }

    return value
  }

  function ContextProvider({ children }: PropsWithChildren) {
    const value = useValue()

    if (value === null) {
      return <LoadingOverlay />
    }

    return (
      <Context value={value}>
        {children}
      </Context>
    )
  }

  return {
    [`use${name}`]: useContext,
    [`${name}Provider`]: ContextProvider,
  } as CreateContextResult<T, Name>
}
