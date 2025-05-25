import type { SwitchProps } from '@mantine/core'
import type { ChangeEvent } from 'react'
import type { StoreComponentProps } from '~/hooks/useStoreProp'
import { Switch } from '@mantine/core'
import { useStoreProp } from '~/hooks/useStoreProp'

export type StoreSwitchProps<T> = StoreComponentProps<SwitchProps, T, boolean>

export function StoreSwitch<T>({ store, storeProp, ...props }: StoreSwitchProps<T>) {
  const [value, setValue] = useStoreProp(store, storeProp)

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.checked)
  }

  return <Switch checked={value} onChange={onChange} {...props} />
}
