import type { PickByValue } from 'utility-types'
import type { StoreApi } from 'zustand'
import { useStore } from 'zustand'

export type StoreComponentProps<OriginalComponentProps, State, ValueType> = Omit<OriginalComponentProps, 'value' | 'onChange'> & {
  store: StoreApi<State>
  storeProp: keyof PickByValue<State, ValueType>
}

export function useStoreProp<T, V>(store: StoreApi<T>, storeProp: keyof PickByValue<T, V>) {
  const value = useStore(store, state => state[storeProp]) as V

  function setValue(value: V) {
    store.setState({ [storeProp]: value } as Partial<T>)
  }

  return [value, setValue] as const
}
