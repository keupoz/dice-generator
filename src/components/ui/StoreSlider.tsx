import type { SliderProps } from './Slider'
import type { StoreComponentProps } from '~/hooks/useStoreProp'
import { useStoreProp } from '~/hooks/useStoreProp'
import { Slider } from './Slider'

export type StoreSliderProps<T> = StoreComponentProps<SliderProps, T, number>

export function StoreSlider<T,>({ store, storeProp, ...props }: StoreSliderProps<T>) {
  const [value, setValue] = useStoreProp(store, storeProp)

  return <Slider value={value} onChange={setValue} {...props} />
}
