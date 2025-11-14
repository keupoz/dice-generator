import type { Atom } from 'atomous'
import type { SVGSelectProps } from './SVGSelect'
import type { SVGResult } from '~/state/svgs'
import { useAtomValue } from '@atomous/react'
import { SVGSelect } from './SVGSelect'

export interface AtomSVGSelectProps extends Omit<SVGSelectProps, 'value' | 'onChange'> {
  atom: Atom<string | SVGResult>
}

export function AtomSVGSelect({ atom, ...props }: AtomSVGSelectProps) {
  const value = useAtomValue(atom)

  return <SVGSelect value={value} onChange={atom.set} {...props} />
}
