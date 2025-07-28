import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Path } from 'three'
import { createExtrudedGeometry } from './createExtrudedGeometry'

export interface SVGCache {
  segments: number
  geometry: Geom3
}

const cacheMap = new WeakMap<Path[], SVGCache>()

export function getSVGGeometry(paths: Path[], segments: number) {
  let cache = cacheMap.get(paths)

  if (cache === undefined || cache.segments !== segments) {
    cache = {
      segments,
      geometry: createExtrudedGeometry(paths, segments),
    }

    cacheMap.set(paths, cache)
  }

  return cache.geometry
}
