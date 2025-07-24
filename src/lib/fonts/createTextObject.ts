import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Font } from 'fontkit'
import { scale, translateX } from '@jscad/modeling/src/operations/transforms'
import { strictAt } from '~/utils/array/strictAt'
import { getGlyphGeometry } from './getGlyphGeometry'

export function createTextObject(font: Font, features: Record<string, boolean>, text: string, segments: number) {
  if (!text.trim()) return

  const layout = font.layout(text, features)
  const geoms: Geom3[] = []

  let offset = 0

  layout.glyphs.forEach((glyph, i) => {
    const position = strictAt(layout.positions, i)
    offset += position.xOffset

    // Skip empty glyphs
    if (glyph.path.commands.length) {
      const geom = getGlyphGeometry(glyph, segments)
      geoms.push(translateX(offset, geom))
    }

    offset += position.xAdvance
  })

  const glyphScale = 1 / font.unitsPerEm

  return scale([glyphScale, glyphScale], geoms)
}
