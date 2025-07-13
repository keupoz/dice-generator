import type { SwitchProps } from '@mantine/core'
import type { WritableAtom } from '~/atoms/types'
import { Switch } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'

export interface AtomSwitchProps extends SwitchProps {
  atom: WritableAtom<boolean>
}

export function AtomSwitch({ atom, ...props }: AtomSwitchProps) {
  const checked = useAtom(atom)

  return <Switch checked={checked} onChange={e => atom.set(e.currentTarget.checked)} {...props} />
}
