import type { PropsWithChildren } from 'react'
import type { Group, Object3D } from 'three'
import { useLayoutEffect, useRef } from 'react'
import { getAlignment } from '~/utils/alignObject'

export interface AlignBottomProps {
  disabled?: boolean
  alignBy?: Object3D | null
}

export function AlignBottom({ disabled, alignBy, children }: PropsWithChildren<AlignBottomProps>) {
  const rootRef = useRef<Group>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    rootRef.current.position.set(0, 0, 0)

    if (!disabled) {
      rootRef.current.updateMatrixWorld()

      const target = alignBy ?? rootRef.current
      const alignment = getAlignment({ modes: ['none', 'min', 'none'] }, target)

      rootRef.current.position.add(alignment)
    }
  })

  return <group ref={rootRef}>{children}</group>
}
