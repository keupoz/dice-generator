import { type StoreComponentProps, useStoreProp } from '~/hooks/useStoreProp'
import { Slider, type SliderProps } from './Slider'

export type StoreSliderProps<T> = StoreComponentProps<SliderProps, T, number>

export function StoreSlider<T,>({ store, storeProp, ...props }: StoreSliderProps<T>) {
  const [value, setValue] = useStoreProp(store, storeProp)

  return <Slider value={value} onChange={setValue} {...props} />
}
