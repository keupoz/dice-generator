import type { StoreApi } from 'zustand'
import { useState } from 'react'
import { createStore } from 'zustand'
import { createContext } from './createContext'

export function createStoreContext<T, Name extends string>(name: Name, useInitialState: () => T) {
  return createContext<StoreApi<T>, `${Name}Store`>(`${name}Store`, () => {
    const initialState = useInitialState()
    const [store] = useState(() => createStore(() => initialState))

    return store
  })
}
