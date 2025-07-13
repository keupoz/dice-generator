import type { Font } from 'fontkit'
import { scale, translateX } from '@jscad/modeling/src/operations/transforms'
import { strictAt } from '~/utils/array/strictAt'
import { getGlyphGeometry } from './getGlyphGeometry'

export function createTextObject(font: Font, features: Record<string, boolean>, text: string, segments: number) {
  if (!text.trim()) return

  let lastOffset = 0

  const layout = font.layout(text, features)
  const geoms = layout.glyphs.map((glyph, i) => {
    const geom = getGlyphGeometry(glyph, segments)

    const position = strictAt(layout.positions, i)
    const offset = lastOffset + position.xOffset

    lastOffset = offset + position.xAdvance

    return translateX(offset, geom)
  })

  const glyphScale = 1 / font.unitsPerEm

  return scale([glyphScale, glyphScale], geoms)
}
