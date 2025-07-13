import { dodecahedron } from './shapes/dodecahedron'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

export default createDie({
  name: 'd12',
  defaultFontScale: 0.6,
  alignFaceIndex: 0,
  invertAlignMatrix: true,
  inputs: {
    diameter: sizeInput(16, 'Diameter'),
  },
  buildBase({ diameter }) {
    return dodecahedron(diameter / 2)
  },
  faces: [
    // Face 1
    {
      instances: [
        {
          faceIndex: 8,
          polygonCenter: true,
          from: { type: 'vertex', index: 2 },
          to: { type: 'edge', index: 0 },
        },
      ],
    },

    // Face 2
    {
      instances: [
        {
          faceIndex: 7,
          polygonCenter: true,
          from: { type: 'vertex', index: 2 },
          to: { type: 'edge', index: 0 },
        },
      ],
    },

    // Face 3
    {
      instances: [
        {
          faceIndex: 4,
          polygonCenter: true,
          from: { type: 'vertex', index: 4 },
          to: { type: 'edge', index: 2 },
        },
      ],
    },

    // Face 4
    {
      instances: [
        {
          faceIndex: 6,
          polygonCenter: true,
          from: { type: 'vertex', index: 3 },
          to: { type: 'edge', index: 1 },
        },
      ],
    },

    // Face 5
    {
      instances: [
        {
          faceIndex: 2,
          polygonCenter: true,
          from: { type: 'vertex', index: 1 },
          to: { type: 'edge', index: 4 },
        },
      ],
    },

    // Face 6
    {
      instances: [
        {
          faceIndex: 5,
          polygonCenter: true,
          from: { type: 'vertex', index: 0 },
          to: { type: 'edge', index: 3 },
        },
      ],
    },

    // Face 7
    {
      instances: [
        {
          faceIndex: 10,
          polygonCenter: true,
          from: { type: 'vertex', index: 3 },
          to: { type: 'edge', index: 1 },
        },
      ],
    },

    // Face 8
    {
      instances: [
        {
          faceIndex: 11,
          polygonCenter: true,
          from: { type: 'vertex', index: 2 },
          to: { type: 'edge', index: 0 },
        },
      ],
    },

    // Face 9
    {
      instances: [
        {
          faceIndex: 1,
          polygonCenter: true,
          from: { type: 'vertex', index: 0 },
          to: { type: 'edge', index: 3 },
        },
      ],
    },

    // Face 10
    {
      instances: [
        {
          faceIndex: 0,
          polygonCenter: true,
          from: { type: 'vertex', index: 4 },
          to: { type: 'edge', index: 2 },
        },
      ],
    },

    // Face 11
    {
      instances: [
        {
          faceIndex: 3,
          polygonCenter: true,
          from: { type: 'vertex', index: 1 },
          to: { type: 'edge', index: 4 },
        },
      ],
    },

    // Face 12
    {
      instances: [
        {
          faceIndex: 9,
          polygonCenter: true,
          from: { type: 'vertex', index: 1 },
          to: { type: 'edge', index: 4 },
        },
      ],
    },
  ],
})
