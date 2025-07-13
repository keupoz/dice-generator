import geom3 from '@jscad/modeling/src/geometries/geom3'
import { union } from '@jscad/modeling/src/operations/booleans'
import { rotateY, translateY } from '@jscad/modeling/src/operations/transforms'
import { cube, cuboid, cylinder } from '@jscad/modeling/src/primitives'
import { SUFFIX_MM } from '~/consts'
import { strictAt } from '~/utils/array/strictAt'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

function getCylindersOffset(size: number, length: number) {
  return size / 4 + length / 2
}

export default createDie({
  name: 'd4i',
  inputs: {
    size: sizeInput(16, 'Size'),
    lengthExtension: { defaultValue: 2, min: 0, max: 20, step: 1, label: 'Length extension', suffix: SUFFIX_MM },
    segments: { defaultValue: 24, min: 4, max: 360, step: 2, label: 'Curve segments' },
  },
  buildBase({ size, lengthExtension, segments }) {
    const cylindersOffset = getCylindersOffset(size, lengthExtension)
    const radius = size / 2

    const baseCylinder = cylinder({
      height: size,
      radius,
      segments,
    })

    const spliceCuboid = cuboid({ size: [size, cylindersOffset * 2, size] })

    const cylinder1 = translateY(cylindersOffset, baseCylinder)

    let cylinder2 = rotateY(Math.PI / 2, baseCylinder)
    cylinder2 = translateY(-cylindersOffset, cylinder2)

    return union(cylinder1, spliceCuboid, cylinder2)
  },
  buildFacesBase({ size, lengthExtension: length }) {
    const cylindersOffset = getCylindersOffset(size, length)
    const baseCylinder = cube({ size })

    const cylinder1 = translateY(cylindersOffset, baseCylinder)

    let cylinder2 = rotateY(Math.PI / 2, baseCylinder)
    cylinder2 = translateY(-cylindersOffset, cylinder2)

    const polygons1 = geom3.toPolygons(cylinder1)
    const polygons2 = geom3.toPolygons(cylinder2)

    return geom3.fromPoints([
      strictAt(polygons1, 4).vertices,
      strictAt(polygons1, 5).vertices,
      strictAt(polygons2, 4).vertices,
      strictAt(polygons2, 5).vertices,
    ])
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: 'edge', index: 3 },
          to: { type: 'edge', index: 1 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: 'edge', index: 1 },
          to: { type: 'edge', index: 3 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 2,
          from: { type: 'edge', index: 0 },
          to: { type: 'edge', index: 2 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: 'edge', index: 2 },
          to: { type: 'edge', index: 0 },
        },
      ],
    },
  ],
})
