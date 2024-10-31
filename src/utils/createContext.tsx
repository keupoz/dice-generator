import type { Pretty } from './types'
import { LoadingOverlay } from '@mantine/core'
import { createContext as createReactContext, type FC, type PropsWithChildren, useContext as useReactContext } from 'react'

export type CreateContextResult<T, Name extends string> = Pretty<{
  [HookName in `use${Name}`]: () => T;
} & {
  [ProviderName in `${Name}Provider`]: FC<PropsWithChildren>
}>

export function createContext<T, Name extends string>(name: Name, useValue: () => T | null) {
  const Context = createReactContext<T | null>(null)

  function useContext() {
    const value = useReactContext(Context)

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
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  return {
    [`use${name}`]: useContext,
    [`${name}Provider`]: ContextProvider,
  } as CreateContextResult<T, Name>
}
