import type { Object3D } from 'three'
import type { ReadableAtom } from '~/atoms/types'
import { useAtom } from '~/atoms/useAtom'

export interface AtomPrimitiveProps {
  atom: ReadableAtom<Object3D | undefined>
}

export function AtomPrimitive({ atom }: AtomPrimitiveProps) {
  const object = useAtom(atom)

  if (!object) return

  return <primitive object={object} />
}
