import type { Atom } from 'atomous'
import type { SliderProps } from './slider/Slider'
import { useAtomValue } from '@atomous/react'
import { Slider } from './slider/Slider'

export interface AtomSliderProps extends Omit<SliderProps, 'value' | 'onChange'> {
  atom: Atom<number>
}

export function AtomSlider({ atom, ...props }: AtomSliderProps) {
  const value = useAtomValue(atom)

  return <Slider value={value} onChange={atom.set} {...props} />
}
