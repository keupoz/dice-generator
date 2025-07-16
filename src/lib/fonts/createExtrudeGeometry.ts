import type { Path } from 'three'
import { extrudeLinear } from '@jscad/modeling/src/operations/extrusions'
import { polygon } from '@jscad/modeling/src/primitives'
import { simplifyPaths } from './simplifyPaths'

export function createExtrudeGeometry(paths: Path[], segments: number) {
  const points = simplifyPaths(paths, segments)
  return extrudeLinear({ height: 2 }, polygon({ points }))
}
