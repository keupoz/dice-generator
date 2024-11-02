import { Select, type SelectProps } from '@mantine/core'
import { type StoreComponentProps, useStoreProp } from '~/hooks/useStoreProp'

export type StoreSelectProps<T> = StoreComponentProps<SelectProps, T, string>

export function StoreSelect<T,>({ store, storeProp, ...props }: StoreSelectProps<T>) {
  const [value, setValue] = useStoreProp(store, storeProp)

  function onChange(value: string | null) {
    if (value !== null) {
      setValue(value)
    }
  }

  return <Select value={value} onChange={onChange} {...props} />
}
