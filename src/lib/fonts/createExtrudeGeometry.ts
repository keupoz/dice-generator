import type { SimplePolygon, Vec2 } from 'manifold-3d'
import type { Path } from 'three'
import { ShapeUtils } from 'three'
import { manifold2cad } from '../converters/manifold2cad'
import { getManifold } from '../manifold'

export function createExtrudeGeometry(paths: Path[], segments: number) {
  const { CrossSection } = getManifold()
  const segmentedPaths = paths.map(path => path.getPoints(segments))

  if (ShapeUtils.isClockWise(segmentedPaths.flat())) {
    for (const path of segmentedPaths) {
      path.reverse()
    }
  }

  const polygons = segmentedPaths.map<SimplePolygon>(path => path.map<Vec2>(({ x, y }) => ([x, y])))

  const crossSection = new CrossSection(polygons)
  const manifold = crossSection.extrude(2, 3)
  const mesh = manifold.getMesh()

  crossSection.delete()
  manifold.delete()

  return manifold2cad(mesh)
}
