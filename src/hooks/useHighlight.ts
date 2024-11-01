import type { ThreeEvent } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { EdgesGeometry, LineSegments, Mesh } from 'three'
import { useConst } from './useConst'

export function useHighlight() {
  const scene = useThree(ctx => ctx.scene)
  const invalidate = useThree(ctx => ctx.invalidate)

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

    if (!(object instanceof Mesh)) {
      return
    }

    const mesh = object as Mesh

    highlight.geometry = new EdgesGeometry(mesh.geometry)

    mesh.updateMatrixWorld()
    highlight.matrix.identity()
    highlight.applyMatrix4(mesh.matrixWorld)

    highlight.visible = true
    invalidate()
  }

  function hideHighlight() {
    highlight.visible = false
    invalidate()
  }

  return { highlight, updateHighlight, hideHighlight }
}
