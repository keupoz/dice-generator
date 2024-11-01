import { type StoreComponentProps, useStoreProp } from '~/hooks/useStoreProp'
import { SVGSelect, type SVGSelectProps } from './SVGSelect'

export type StoreSVGSelectProps<T> = StoreComponentProps<SVGSelectProps, T, string | number>

export function StoreSVGSelect<T>({ store, storeProp, ...props }: StoreSVGSelectProps<T>) {
  const [value, setValue] = useStoreProp(store, storeProp)

  return <SVGSelect value={value} onChange={setValue} {...props} />
}
