import { createContext, use } from 'react'

const NOT_INITIALIZED = Symbol('NOT_INITIALIZED')

export function createSafeContext<T>() {
  const Context = createContext<T | typeof NOT_INITIALIZED>(NOT_INITIALIZED)

  function useContext() {
    const value = use(Context)

    if (value === NOT_INITIALIZED) {
      throw new Error('Context is not initialized')
    }

    return value
  }

  return [Context, useContext] as const
}
