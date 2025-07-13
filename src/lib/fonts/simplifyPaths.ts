import type { Point } from '@doodle3d/clipper-js'
import type { Vec2 } from '@jscad/modeling/src/maths/types'
import ClipperShape from '@doodle3d/clipper-js'
import { Path, Shape, Vector2 } from 'three'
import { strictFirst } from '~/utils/iterable/strictFirst'

const POINT_PRECISION_MUL = 100000

export function simplifyPaths(paths: Path[], segments: number) {
  return createClipperShape(paths, segments)
    .simplify('pftNonZero')
    .separateShapes()
    .map((clipperShape) => {
      const clipperPaths = clipperShape.paths.values()
      const firstClipperPath = strictFirst(clipperPaths)
      const shape = new Shape(convertClipperPath(firstClipperPath))

      for (const clipperPath of clipperPaths) {
        const path = new Path(convertClipperPath(clipperPath))
        shape.holes.push(path)
      }

      return shape
    })
}

export function simplifyPaths2(paths: Path[], segments: number) {
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

function convertClipperPath(points: Point[]) {
  return points.map(({ X, Y }) => {
    // Restore original scale
    return new Vector2(X / POINT_PRECISION_MUL, Y / POINT_PRECISION_MUL)
  })
}
