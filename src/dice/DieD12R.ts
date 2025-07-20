import { rhombicDodecahedron } from './shapes/rhombicDodecahedron'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

export default createDie({
  name: 'd12r',
  defaultFontScale: 0.6,
  inputs: {
    diameter: sizeInput(16, 'Diameter'),
  },
  buildBase({ diameter }) {
    return rhombicDodecahedron(diameter / 2)
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 11,
          from: { type: 'vertex', index: 0 },
          to: { type: 'vertex', index: 2 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 9,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 4,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 0,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 5
    {
      instances: [
        {
          faceIndex: 5,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 6
    {
      instances: [
        {
          faceIndex: 10,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 7
    {
      instances: [
        {
          faceIndex: 1,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 8
    {
      instances: [
        {
          faceIndex: 2,
          from: { type: 'vertex', index: 0 },
          to: { type: 'vertex', index: 2 },
        },
      ],
    },

    // Face 9
    {
      instances: [
        {
          faceIndex: 6,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 10
    {
      instances: [
        {
          faceIndex: 7,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 11
    {
      instances: [
        {
          faceIndex: 3,
          from: { type: 'vertex', index: 2 },
          to: { type: 'vertex', index: 0 },
        },
      ],
    },

    // Face 12
    {
      instances: [
        {
          faceIndex: 8,
          from: { type: 'vertex', index: 0 },
          to: { type: 'vertex', index: 2 },
        },
      ],
    },
  ],
})
