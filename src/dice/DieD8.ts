import type { DieFaceOptions } from './utils/types'
import { octahedron } from './shapes/octahedron'
import { createDie } from './utils/createDie'
import { sizeInput } from './utils/sizeInput'

function createFaceConfig(index: number): DieFaceOptions {
  return {
    instances: [
      {
        faceIndex: index,
        polygonCenter: true,
        from: { type: 'vertex', index: 0 },
        to: { type: 'edge', index: 2 },
      },
    ],
  }
}

export default createDie({
  name: 'd8',
  defaultFontScale: 0.6,
  inputs: {
    diameter: sizeInput(16, 'Diameter'),
  },
  buildBase({ diameter }) {
    return octahedron(diameter / 2)
  },
  faces: [
    createFaceConfig(0),
    createFaceConfig(4),
    createFaceConfig(3),
    createFaceConfig(7),
    createFaceConfig(2),
    createFaceConfig(6),
    createFaceConfig(1),
    createFaceConfig(5),
  ],
})
