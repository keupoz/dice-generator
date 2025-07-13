import type { SVGSelectProps } from './SVGSelect'
import type { WritableAtom } from '~/atoms/types'
import type { SVGResult } from '~/state/svgs'
import { useAtom } from '~/atoms/useAtom'
import { SVGSelect } from './SVGSelect'

export interface AtomSVGSelectProps extends Omit<SVGSelectProps, 'value' | 'onChange'> {
  atom: WritableAtom<string | SVGResult>
}

export function AtomSVGSelect({ atom, ...props }: AtomSVGSelectProps) {
  const value = useAtom(atom)

  return <SVGSelect value={value} onChange={atom.set} {...props} />
}
