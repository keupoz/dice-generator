import type { Font } from 'fontkit'
import { memo, useMemo } from 'react'
import { useAppState } from '~/appState'
import { useUpdateCSG } from '~/components/three/csg/CSGContext'
import { useMaterial } from '~/contexts/MaterialContext'
import { getGlyphGeometry } from '~/utils/fonts/getGlyphGeometry'
import { getArrayItem } from '~/utils/getArrayItem'

export interface Text3DProps {
  text: string
  font: Font | null
  features: Record<string, boolean>
}

export const Text3D = memo<Text3DProps>(({ text, font, features }) => {
  useUpdateCSG()

  const segments = useAppState(state => state.fontSegments)

  const { fontMaterial } = useMaterial()

  const layout = useMemo(() => {
    const trimmedText = text.trim()

    if (font === null || trimmedText.length === 0) {
      return null
    }

    return font.layout(trimmedText, features)
  }, [features, font, text])

  if (layout === null) {
    return null
  }

  const scale = font ? 1 / font.unitsPerEm : 1

  let offset = 0

  return (
    <group scale-x={scale} scale-y={scale}>
      {layout.glyphs.map((glyph, i) => {
        const position = getArrayItem(layout.positions, i)
        const brushOffset = offset + position.xOffset

        offset = brushOffset + position.xAdvance

        const geometry = getGlyphGeometry(glyph, segments)

        return (
          <brush
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            geometry={geometry}
            material={fontMaterial}
            position-x={brushOffset}
          />
        )
      })}
    </group>
  )
})
