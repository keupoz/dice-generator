import type { DieConfig, DieInputConfig, DieInputValues, DieOptionsStore } from './types'
import { createStore } from 'zustand'

export function createDieStore<T extends Record<string, DieInputConfig>>(config: DieConfig<T>) {
  return createStore<DieOptionsStore<T>>((set) => {
    const extraOptionsValues = Object.fromEntries(
      Object.entries(config.extraOptions).map(([key, value]) => [key, value.value]),
    )

    return {
      visible: true,
      size: config.defaultSize,
      fontScale: config.defaultFontScale ?? 1,

      extraOptions: extraOptionsValues as unknown as DieInputValues<T>,

      setExtraOptions(name, value) {
        set(({ extraOptions }) => ({
          extraOptions: { ...extraOptions, [name]: value },
        }))
      },
    }
  })
}
