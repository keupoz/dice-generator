import type { Path } from 'three'
import { ExtrudeGeometry } from 'three'
import { simplifyPaths } from '../clipperjs'

export function paths2geometry(paths: Path[], segments: number) {
  const shapes = simplifyPaths(paths, segments)

  return new ExtrudeGeometry(shapes, {
    depth: 2,
    bevelEnabled: false,
  })
}
