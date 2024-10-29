import type { Font, FontCollection } from 'fontkit'

export function flatFontCollection(collection: Array<Font | FontCollection>) {
  return collection.flatMap(item => 'fonts' in item ? item.fonts : item)
}
