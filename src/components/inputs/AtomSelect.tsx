import type { SelectProps } from '@mantine/core'
import type { Atom } from 'atomous'
import { useAtomValue } from '@atomous/react'
import { Select } from '@mantine/core'

export interface AtomSelectProps<T extends string> extends SelectProps {
  atom: Atom<T>
}

export function AtomSelect<T extends string>({ atom, ...props }: AtomSelectProps<T>) {
  const value = useAtomValue(atom)

  function onChange(value: string | null) {
    if (value === null) return
    atom.set(value as T)
  }

  return <Select value={value} onChange={onChange} {...props} />
}
