import { cuboid, cylinder } from '@jscad/modeling/src/primitives'
import { SUFFIX_MM } from '~/consts'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

export default createDie({
  name: 'd2',
  inputs: {
    diameter: sizeInput(16, 'Diameter'),
    height: { defaultValue: 3, min: 1, max: 40, step: 1, label: 'Height', suffix: SUFFIX_MM },
    segments: { defaultValue: 24, min: 4, max: 360, step: 1, label: 'Segments' },
  },
  buildBase({ diameter, height, segments }) {
    return cylinder({ radius: diameter / 2, height, segments })
  },
  buildFacesBase({ diameter, height }) {
    return cuboid({ size: [diameter, diameter, height] })
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
          faceIndex: 4,
          from: { type: 'edge', index: 0 },
          to: { type: 'edge', index: 2 },
        },
      ],
    },
  ],
})
