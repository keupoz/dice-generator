import type { Font } from 'fontkit'
import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { useUpdateCSG } from '~/components/three/csg/CSGContext'
import { FONT_MATERIAL } from '~/materials'
import { useFontSettings } from '~/stores/FontSettingsStore'
import { getGlyphGeometry } from '~/utils/fonts/getGlyphGeometry'
import { getArrayItem } from '~/utils/getArrayItem'

export interface Text3DProps {
  text: string
  font: Font | null
  features: Record<string, boolean>
}

export const Text3D: FC<Text3DProps> = memo(({ text, font, features }) => {
  useUpdateCSG()

  const segments = useFontSettings(state => state.segments)

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
            key={glyph.id}
            geometry={geometry}
            material={FONT_MATERIAL}
            position-x={brushOffset}
          />
        )
      })}
    </group>
  )
})
