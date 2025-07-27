import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import geom3 from '@jscad/modeling/src/geometries/geom3'
import { subtract } from '@jscad/modeling/src/operations/booleans'
import { hull } from '@jscad/modeling/src/operations/hulls'
import { scale, translate } from '@jscad/modeling/src/operations/transforms'
import { geodesicSphere } from '@jscad/modeling/src/primitives'

const baseCursor = geodesicSphere({ frequency: 24 })

export function createBlank(base: Geom3, delta: number) {
  const cursor = scale([delta, delta, delta], baseCursor)

  let result = base

  for (const polygon of geom3.toPoints(base)) {
    const cursors = polygon.map(point => translate(point, cursor))
    const expandedPolygon = hull(cursors)
    result = subtract(result, expandedPolygon)
  }

  return result
}
