import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Glyph } from 'fontkit'
import type { Path } from 'three'
import { createExtrudedGeometry } from './createExtrudedGeometry'
import { glyph2paths } from './glyph2paths'

export interface GlyphCache {
  segments: number
  paths: Path[]
  geometry: Geom3
}

const cacheMap = new WeakMap<Glyph, GlyphCache>()

export function getGlyphGeometry(glyph: Glyph, segments: number) {
  let cache = cacheMap.get(glyph)

  if (cache === undefined || cache.segments !== segments) {
    const paths = cache?.paths ?? glyph2paths(glyph)

    cache = {
      segments,
      paths,
      geometry: createExtrudedGeometry(paths, segments),
    }

    cacheMap.set(glyph, cache)
  }

  return cache.geometry
}
