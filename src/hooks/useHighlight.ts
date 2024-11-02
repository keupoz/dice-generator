import type { ThreeEvent } from '@react-three/fiber'
import type { Object3D } from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { EdgesGeometry, LineSegments, Mesh } from 'three'
import { useConst } from './useConst'

export function useHighlight() {
  const scene = useThree(ctx => ctx.scene)
  const invalidate = useThree(ctx => ctx.invalidate)
  const lastObjectRef = useRef<Object3D | null>(null)

  const highlight = useConst(() => {
    const lineSegments = new LineSegments()

    lineSegments.matrixAutoUpdate = false

    return lineSegments
  })

  useEffect(() => {
    scene.add(highlight)

    return () => {
      scene.remove(highlight)
    }
  }, [highlight, scene])

  function updateHighlight(e: ThreeEvent<PointerEvent>) {
    const object = e.intersections[0]?.object

    if (object === lastObjectRef.current) {
      return
    }

    if (!(object instanceof Mesh)) {
      return
    }

    const mesh = object as Mesh

    highlight.geometry = new EdgesGeometry(mesh.geometry)

    mesh.updateMatrixWorld()
    highlight.matrix.identity()
    highlight.applyMatrix4(mesh.matrixWorld)

    highlight.visible = true
    lastObjectRef.current = object

    invalidate()
  }

  function hideHighlight() {
    highlight.visible = false
    lastObjectRef.current = null
    invalidate()
  }

  return { highlight, updateHighlight, hideHighlight }
}
