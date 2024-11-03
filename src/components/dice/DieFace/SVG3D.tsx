import { memo, useMemo } from 'react'
import { Vector3 } from 'three'
import { useAppState } from '~/appState'
import { useUpdateCSG } from '~/components/three/csg/CSGContext'
import { useMaterial } from '~/contexts/MaterialContext'
import { getBoundingBox } from '~/utils/alignObject'
import { getSVGGeometry } from '~/utils/fonts/getSVGGeometry'
import { useUpdateFaceLayout } from './FaceLayoutContext'

export interface SVG3DProps {
  id: number
}

export const SVG3D = memo<SVG3DProps>(({ id }) => {
  useUpdateFaceLayout()
  useUpdateCSG()

  const svgs = useAppState(state => state.userSVGs)
  const segments = useAppState(state => state.fontSegments)
  const fontScale = useAppState(state => state.fontScale)
  const svgScale = useAppState(state => state.svgScale)

  const { fontMaterial } = useMaterial()

  const svg = useMemo(() => {
    return svgs.find(svg => svg.id === id) ?? null
  }, [id, svgs])

  const geometry = useMemo(() => {
    if (!svg) {
      return null
    }

    return getSVGGeometry(svg, segments)
  }, [segments, svg])

  if (geometry === null) {
    return null
  }

  const bounds = getBoundingBox(geometry)
  const size = bounds.getSize(new Vector3())

  const viewboxScale = svg?.scaleByViewbox ? svg.viewboxScale : null
  const boxScale = viewboxScale ?? 1 / Math.max(size.x, size.y)
  const scale = (boxScale * svgScale) / fontScale

  return (
    <group scale-x={scale} scale-y={-scale}>
      <brush geometry={geometry} material={fontMaterial} />
    </group>
  )
})
