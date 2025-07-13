import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { setControls } from '~/state/controls'

export function SceneHooks() {
  const controls = useThree(state => state.controls)

  useEffect(() => {
    setControls(controls)
  }, [controls])

  return null
}
