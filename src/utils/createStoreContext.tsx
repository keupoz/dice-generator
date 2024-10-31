import { createStore, type StoreApi } from 'zustand'
import { useConst } from '~/hooks/useConst'
import { createContext } from './createContext'

export function createStoreContext<T, Name extends string>(name: Name, useInitialState: () => T) {
  return createContext<StoreApi<T>, `${Name}Store`>(`${name}Store`, () => {
    const initialState = useInitialState()
    const store = useConst(() => createStore(() => initialState))

    return store
  })
}
