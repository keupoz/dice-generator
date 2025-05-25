import type { ThreeElement } from '@react-three/fiber'
import type { Ref } from 'react'
import type { EventDispatcher } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import CameraControlsImpl from 'camera-controls'
import { useEffect, useMemo } from 'react'
import { Box3, Matrix4, Quaternion, Raycaster, Sphere, Spherical, Vector2, Vector3, Vector4 } from 'three'

CameraControlsImpl.install({
  THREE: {
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
  },
})

export interface CameraControlsProps extends Omit<ThreeElement<typeof CameraControlsImpl>, 'args' | keyof EventDispatcher> {
  ref?: Ref<CameraControlsImpl>
  makeDefault?: boolean
}

export function CameraControls({ ref, makeDefault, ...props }: CameraControlsProps) {
  const camera = useThree(state => state.camera)
  const domElement = useThree(state => state.gl.domElement)
  const controls = useMemo(() => new CameraControlsImpl(camera), [camera])

  const invalidate = useThree(state => state.invalidate)
  const get = useThree(state => state.get)
  const set = useThree(state => state.set)

  useFrame((_state, delta) => {
    if (controls.enabled) {
      controls.update(delta)
    }
  })

  useEffect(() => {
    controls.connect(domElement)

    return () => controls.disconnect()
  }, [controls, domElement])

  useEffect(() => {
    function callback() {
      invalidate()
    }

    controls.addEventListener('controlstart', callback)
    controls.addEventListener('transitionstart', callback)

    controls.addEventListener('control', callback)
    controls.addEventListener('update', callback)

    return () => {
      controls.removeEventListener('controlstart', callback)
      controls.removeEventListener('transitionstart', callback)

      controls.removeEventListener('control', callback)
      controls.removeEventListener('update', callback)
    }
  }, [controls, invalidate])

  useEffect(() => {
    if (makeDefault) {
      const old = get().controls
      set({ controls: controls as unknown as EventDispatcher })

      return () => set({ controls: old })
    }
  }, [controls, get, makeDefault, set])

  return <primitive ref={ref} object={controls} {...props} />
}
