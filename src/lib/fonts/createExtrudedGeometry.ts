import type { Vec2 } from 'manifold-3d'
import type { Path } from 'three'
import { manifold2cad } from '../converters/manifold2cad'
import { getManifold } from '../manifold'

export function createExtrudedGeometry(paths: Path[], segments: number) {
  const { CrossSection } = getManifold()

  const polygons = paths.map(path => path.getPoints(segments).map<Vec2>(({ x, y }) => ([x, y])))
  const crossSection = new CrossSection(polygons, 'NonZero')
  const manifold = crossSection.extrude(2, 3)
  const mesh = manifold.getMesh()

  crossSection.delete()
  manifold.delete()

  return manifold2cad(mesh)
}
