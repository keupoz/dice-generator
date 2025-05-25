import type { FontInfo } from '~/appState'
import type { FixedFont } from '~/fontkit'
import { Buffer } from 'node:buffer'
import { create } from 'fontkit'

let lastId = 0

export function readFontFile(arrayBuffer: ArrayBuffer) {
  let fonts

  fonts = create(Buffer.from(arrayBuffer))

  if ('fonts' in fonts) {
    fonts = fonts.fonts
  } else {
    fonts = [fonts]
  }

  return fonts.map<FontInfo>(font => ({
    id: (lastId++).toString(),
    font: font as FixedFont,
  }))
}
