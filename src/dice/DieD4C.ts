import { union } from '@jscad/modeling/src/operations/booleans'
import { rotateY, translateY } from '@jscad/modeling/src/operations/transforms'
import { cube, cuboid, ellipsoid } from '@jscad/modeling/src/primitives'
import { SUFFIX_MM } from '~/consts'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

export default createDie({
  name: 'd4c',
  inputs: {
    width: sizeInput(14, 'Body width'),
    length: { defaultValue: 21, min: 1, max: 40, step: 1, label: 'Body length', suffix: SUFFIX_MM },
    pointLength: { defaultValue: 7, min: 1, max: 20, step: 1, label: 'Point length', suffix: SUFFIX_MM },
  },
  buildBase({ width, length, pointLength }) {
    const radius = (width / 2) * Math.SQRT2

    let pointEllipsoid, base

    pointEllipsoid = ellipsoid({
      radius: [radius, pointLength, radius],
      segments: 4,
    })
    pointEllipsoid = rotateY(Math.PI / 4, pointEllipsoid)

    base = cuboid({ size: [width, length, width] })
    base = union(base, translateY(-length / 2, pointEllipsoid))
    base = union(base, translateY(length / 2, pointEllipsoid))

    return base
  },
  buildFacesBase({ width }) {
    return cube({ size: width })
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 5,
          from: { type: 'edge', index: 3 },
          to: { type: 'edge', index: 1 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: 'edge', index: 3 },
          to: { type: 'edge', index: 1 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: 'edge', index: 2 },
          to: { type: 'edge', index: 0 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 4,
          from: { type: 'edge', index: 2 },
          to: { type: 'edge', index: 0 },
        },
      ],
    },
  ],
})
