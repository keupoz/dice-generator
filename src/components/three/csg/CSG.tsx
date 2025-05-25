import type { PropsWithChildren } from 'react'
import type { Group } from 'three'
import { useLayoutEffect, useRef } from 'react'
import { Mesh } from 'three'
import { useAppState } from '~/appState'
import { useEvaluator } from '~/contexts/EvaluatorContext'
import { useForceUpdate } from '~/hooks/useForceUpdate'
import { getOperation } from './availableOperations'
import { CSGContext } from './CSGContext'
import './extendR3F'

export interface CSGProps {
  disabled?: boolean
}

/** Adapted from https://github.com/pmndrs/react-three-csg/blob/7b6d31616085476975f6592ff424948acb5bfcd4/src/index.tsx#L81 */
export function CSG({ disabled, children }: PropsWithChildren<CSGProps>) {
  const rootRef = useRef<Group>(null)
  const outputRef = useRef<Mesh>(null)

  const forceUpdate = useForceUpdate()

  const { getEvaluator } = useEvaluator()

  const renderOperation = useAppState(store => store.renderOperation)
  const renderEngine = useAppState(store => store.renderEngine)

  const operation = getOperation(renderOperation)

  function update() {
    if (!outputRef.current) {
      return
    }

    if (disabled || !rootRef.current) {
      outputRef.current.copy(new Mesh())
      outputRef.current.visible = false
    } else {
      const evaluate = getEvaluator(renderEngine)
      const result = evaluate(rootRef.current, operation)

      if (result) {
        outputRef.current.copy(result)
      }
    }
  }

  useLayoutEffect(() => {
    update()
  })

  return (
    <>
      <group ref={rootRef} visible={disabled}>
        <CSGContext value={forceUpdate}>
          {children}
        </CSGContext>
      </group>

      <mesh ref={outputRef} raycast={() => null} />
    </>
  )
}
