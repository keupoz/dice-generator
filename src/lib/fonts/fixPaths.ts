import type { Point } from '@doodle3d/clipper-js'
import type { Vec2 } from '@jscad/modeling/src/maths/types'
import type { Path } from 'three'
import ClipperShape from '@doodle3d/clipper-js'

const POINT_PRECISION_MUL = 100000

export function fixPaths(paths: Path[], segments: number) {
  return createClipperShape(paths, segments)
    .simplify('pftNonZero')
    .separateShapes()
    .flatMap((clipperShape) => {
      return clipperShape.paths.map((clipperPath) => {
        return clipperPath.map<Vec2>(({ X, Y }) => [X / POINT_PRECISION_MUL, Y / POINT_PRECISION_MUL])
      })
    })
}

function createClipperShape(paths: Path[], segments: number) {
  const clipperPaths: Point[][] = []

  for (const path of paths) {
    const clipperPath = path
      .closePath()
      .getPoints(segments)
      // Scale path so Clipper doesn't remove necessary points
      // Fixes loosing segments on some curves
      .map<Point>(point => ({
        X: point.x * POINT_PRECISION_MUL,
        Y: point.y * POINT_PRECISION_MUL,
      }))

    clipperPaths.push(clipperPath)
  }

  return new ClipperShape(clipperPaths, true, false, false, false)
}
