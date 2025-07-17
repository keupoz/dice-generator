import type { SimplePolygon, Vec2 } from 'manifold-3d'
import type { Path } from 'three'
import { ShapeUtils } from 'three'
import { manifold2cad } from '../converters/manifold2cad'
import { getSafeManifold } from '../manifold/instance'

export function createExtrudeGeometry(paths: Path[], segments: number) {
  const safeManifold = getSafeManifold()

  if (!safeManifold) throw new Error('Manifold is not initialized')

  return safeManifold(({ CrossSection }) => {
    const segmentedPaths = paths.map(path => path.getPoints(segments))

    if (ShapeUtils.isClockWise(segmentedPaths.flat())) {
      for (const path of segmentedPaths) {
        path.reverse()
      }
    }

    const polygons = segmentedPaths.map<SimplePolygon>(path => path.map<Vec2>(({ x, y }) => ([x, y])))
    const mesh = new CrossSection(polygons).extrude(2, 3).getMesh()

    return manifold2cad(mesh)
  })
}
