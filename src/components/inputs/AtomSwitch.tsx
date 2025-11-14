import type { SwitchProps } from '@mantine/core'
import type { Atom } from 'atomous'
import { useAtomValue } from '@atomous/react'
import { Switch } from '@mantine/core'

export interface AtomSwitchProps extends SwitchProps {
  atom: Atom<boolean>
}

export function AtomSwitch({ atom, ...props }: AtomSwitchProps) {
  const checked = useAtomValue(atom)

  return <Switch checked={checked} onChange={e => atom.set(e.currentTarget.checked)} {...props} />
}
