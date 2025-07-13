import type { Glyph } from 'fontkit'
import { Path } from 'three'
import { strictAt } from '~/utils/array/strictAt'

export function glyph2paths(glyph: Glyph) {
  const paths: Path[] = []

  let currentPath = new Path()

  for (const command of glyph.path.commands) {
    switch (command.command) {
      case 'moveTo': {
        const x = strictAt(command.args, 0)
        const y = strictAt(command.args, 1)

        currentPath.moveTo(x, y)

        break
      }

      case 'lineTo': {
        const x = strictAt(command.args, 0)
        const y = strictAt(command.args, 1)

        currentPath.lineTo(x, y)

        break
      }

      case 'bezierCurveTo': {
        const x1 = strictAt(command.args, 0)
        const y1 = strictAt(command.args, 1)
        const x2 = strictAt(command.args, 2)
        const y2 = strictAt(command.args, 3)
        const x = strictAt(command.args, 4)
        const y = strictAt(command.args, 5)

        currentPath.bezierCurveTo(x1, y1, x2, y2, x, y)
        break
      }

      case 'quadraticCurveTo': {
        const x1 = strictAt(command.args, 0)
        const y1 = strictAt(command.args, 1)
        const x = strictAt(command.args, 2)
        const y = strictAt(command.args, 3)

        currentPath.quadraticCurveTo(x1, y1, x, y)
        break
      }

      case 'closePath': {
        currentPath.closePath()
        paths.push(currentPath)

        currentPath = new Path()
      }
    }
  }

  return paths
}
