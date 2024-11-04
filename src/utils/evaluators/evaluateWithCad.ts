import type { Object3D } from 'three'
import type { CSGOperation } from 'three-bvh-csg'
import { subtract, union } from '@jscad/modeling/src/operations/booleans'
import { Mesh } from 'three'
import { ADDITION } from 'three-bvh-csg'
import { cad2geometry } from '~/utils/cad2three'
import { mesh2cad } from '~/utils/three2cad'
import { processBrushes } from './processBrushes'

export function evaluateWithCad(object: Object3D, operation: CSGOperation) {
  return processBrushes(object, (brushes) => {
    const baseBrush = brushes[0]

    if (!baseBrush) {
      return null
    }

    let result = mesh2cad(baseBrush)

    for (let i = 1; i < brushes.length; i++) {
      const brush = brushes[i]

      if (!brush) {
        continue
      }

      const cad = mesh2cad(brush)

      if (operation === ADDITION) {
        result = union(result, cad)
      } else {
        result = subtract(result, cad)
      }
    }

    const geometry = cad2geometry(result)
    const mesh = new Mesh(geometry, baseBrush.material)

    return mesh
  })
}
