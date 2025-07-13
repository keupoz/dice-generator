import type { SelectProps } from '@mantine/core'
import type { WritableAtom } from '~/atoms/types'
import { Select } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'

export interface AtomSelectProps<T extends string> extends SelectProps {
  atom: WritableAtom<T>
}

export function AtomSelect<T extends string>({ atom, ...props }: AtomSelectProps<T>) {
  const value = useAtom(atom)

  function onChange(value: string | null) {
    if (value === null) return
    atom.set(value as T)
  }

  return <Select value={value} onChange={onChange} {...props} />
}
