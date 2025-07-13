import type { ReadableAtom } from '~/atoms/types'
import { Loader } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'

export interface AtomLoaderProps {
  atom: ReadableAtom<boolean>
}

export function AtomLoader({ atom }: AtomLoaderProps) {
  const value = useAtom(atom)

  return value ? <Loader size="sm" /> : null
}
