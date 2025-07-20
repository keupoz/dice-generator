import { intersect } from '@jscad/modeling/src/operations/booleans'
import { rotateX, scale, translateZ } from '@jscad/modeling/src/operations/transforms'
import { cube, sphere } from '@jscad/modeling/src/primitives'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

const DEG_60 = Math.PI / 3

const TRIANGLE_PRISM = (() => {
  let cutter = cube({ size: 1 })
  cutter = translateZ(1 / 4, cutter)

  let result = cutter

  result = intersect(result, cutter)
  result = intersect(result, rotateX(DEG_60 * 2, cutter))
  result = intersect(result, rotateX(-DEG_60 * 2, cutter))

  return result
})()

export default createDie({
  name: 'd3',
  inputs: {
    diameter: sizeInput(16, 'Sphere diameter'),
    segments: { defaultValue: 24, min: 24, max: 60, step: 1, label: 'Segments' },
  },
  buildBase({ diameter, segments }) {
    const basePrism = scale([diameter, diameter, diameter], TRIANGLE_PRISM)
    const baseSphere = sphere({ radius: diameter / 2, segments })

    return intersect(basePrism, baseSphere)
  },
  buildFacesBase({ diameter }) {
    return scale([diameter, diameter, diameter], TRIANGLE_PRISM)
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: 'edge', index: 0 },
          to: { type: 'center' },
        },
        {
          faceIndex: 1,
          from: { type: 'edge', index: 2 },
          to: { type: 'center' },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: 'edge', index: 0 },
          to: { type: 'center' },
        },
        {
          faceIndex: 2,
          from: { type: 'edge', index: 2 },
          to: { type: 'center' },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 2,
          from: { type: 'edge', index: 0 },
          to: { type: 'center' },
        },
        {
          faceIndex: 0,
          from: { type: 'edge', index: 2 },
          to: { type: 'center' },
        },
      ],
    },
  ],
})
