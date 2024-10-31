import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export function createPersistStore<T, S extends object = object>(name: string, initializer: () => T, partialize: (state: T) => S) {
  return create<T>()(persist(initializer, { name, partialize }))
}
