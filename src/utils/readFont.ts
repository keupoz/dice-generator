import { Buffer } from 'node:buffer'
import { create } from 'fontkit'
import type { FontInfo } from '~/appState'

let lastId = 0

export async function readFontFile(bufferReadable: Pick<File, 'arrayBuffer'>) {
  const rawFont = await bufferReadable.arrayBuffer()
  let fonts

  fonts = create(Buffer.from(rawFont))

  if ('fonts' in fonts) {
    fonts = fonts.fonts
  } else {
    fonts = [fonts]
  }

  return fonts.map<FontInfo>(font => ({
    id: (lastId++).toString(),
    font,
  }))
}
