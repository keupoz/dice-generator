import type { SliderProps } from './slider/Slider'
import type { WritableAtom } from '~/atoms/types'
import { useAtom } from '~/atoms/useAtom'
import { Slider } from './slider/Slider'

export interface AtomSliderProps extends Omit<SliderProps, 'value' | 'onChange'> {
  atom: WritableAtom<number>
}

export function AtomSlider({ atom, ...props }: AtomSliderProps) {
  const value = useAtom(atom)

  return <Slider value={value} onChange={atom.set} {...props} />
}
