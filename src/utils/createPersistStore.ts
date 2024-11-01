import { createStore, useStore } from 'zustand'
import { persist } from 'zustand/middleware'

export function createPersistStore<T, S extends object = object>(name: string, initializer: () => T, partialize: (state: T) => S) {
  const store = createStore<T>()(persist(initializer, { name, partialize }))

  function useCreatedStore(): T
  function useCreatedStore<U>(selector: (state: T) => U): U
  function useCreatedStore<U>(selector?: (state: T) => U) {
    return useStore(store, selector!)
  }

  return [store, useCreatedStore] as const
}
