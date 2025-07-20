import type { DieFaceOptions } from './types'
import { SUFFIX_MM } from '~/consts'
import { trapezohedron } from '../shapes/trapezohedron'
import { createDie } from './createDie'
import { sizeInput } from './sizeInput'

export function createD10(isD100: boolean) {
  return createDie({
    name: isD100 ? 'd100' : 'd10',
    defaultFontScale: isD100 ? 0.35 : 0.5,
    inputs: {
      height: sizeInput(16, 'Height'),
      radius: { defaultValue: 8, min: 1, max: 40, step: 1, label: 'Radius', suffix: SUFFIX_MM },
    },
    buildBase({ height, radius }) {
      return trapezohedron(10, height / 2, radius)
    },
    faces: [
      createFaceConfig(isD100, 0, 0),
      createFaceConfig(isD100, 8, 1),
      createFaceConfig(isD100, 2, 2),
      createFaceConfig(isD100, 5, 3),
      createFaceConfig(isD100, 3, 4),
      createFaceConfig(isD100, 9, 5),
      createFaceConfig(isD100, 1, 6),
      createFaceConfig(isD100, 7, 7),
      createFaceConfig(isD100, 4, 8),
      createFaceConfig(isD100, 6, 9),
    ],
  })
}

function createFaceConfig(isD100: boolean, index: number, i: number) {
  const options: DieFaceOptions = {
    instances: [
      {
        faceIndex: index,
        polygonCenter: true,
        from: { type: 'vertex', index: 0 },
        to: { type: 'vertex', index: 2 },
      },
    ],
  }

  if (i === 9) {
    options.text = '0'
  }

  if (isD100) {
    options.text ??= `${i + 1}`
    options.text += '0'
    options.initialRotation = Math.PI / 2
  }

  return options
}
