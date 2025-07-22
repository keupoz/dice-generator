import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { DieFaceOptions } from './types'
import type { ReadableAtom } from '~/atoms/types'
import type { CurrentFontAtoms } from '~/state/fonts'
import type { SVGResult } from '~/state/svgs'
import { measureAggregateBoundingBox } from '@jscad/modeling/src/measurements'
import { align, rotateZ, scale, transform, translate } from '@jscad/modeling/src/operations/transforms'
import { degToRad } from 'three/src/math/MathUtils.js'
import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { createTextObject } from '~/lib/fonts/createTextObject'
import { $extrusionDepth, $segments } from '~/state/faces'
import { $fontScale, currentMarkFont, currentTextFont } from '~/state/fonts'
import { createDieFaceInstance } from './createDieFaceInstance'

export type DieFaceResult = ReturnType<typeof createDieFace>

function createTextObjectAtom({ $currentFont, $features }: CurrentFontAtoms, $text: ReadableAtom<string | SVGResult>) {
  return computed(() => {
    const text = $text.get()
    const segments = $segments.get()

    if (typeof text === 'string') {
      const currentFont = $currentFont.get()

      if (!currentFont) return

      return createTextObject(currentFont, $features.get(), text, segments)
    }

    return text.$geom.get()
  })
}

export function createDieFace($facesBaseGeom: ReadableAtom<Geom3>, $localFontScale: ReadableAtom<number>, options: DieFaceOptions, index: number) {
  const defaultText = options.text ?? `${index + 1}`
  const defaultMark = defaultText === '6' || defaultText === '9' ? '_' : ''
  const name = `Face ${defaultText}`

  const $text = atom<string | SVGResult>(defaultText)
  const $mark = atom<string | SVGResult>(defaultMark)
  const $isUnderscore = atom(true)
  const $markGap = atom(0.1)
  const $rotation = atom(0)
  const $offsetX = atom(0)
  const $offsetY = atom(0)

  const $textGeoms = createTextObjectAtom(currentTextFont, $text)
  const $markGeoms = createTextObjectAtom(currentMarkFont, $mark)

  const $faceLayout = computed(() => {
    let markGeoms = $markGeoms.get()
    let textGeoms = $textGeoms.get() ?? markGeoms

    if (!textGeoms) return

    textGeoms = align({ modes: ['center', 'center', 'center'], grouped: true }, textGeoms)

    if (!markGeoms) return textGeoms

    const [[minX, minY], [maxX, maxY]] = measureAggregateBoundingBox(textGeoms)
    const textWidth = (maxX - minX) / 2
    const textHeight = (maxY - minY) / 2

    const markGap = $markGap.get()

    if ($isUnderscore.get()) {
      const offset = textHeight + markGap
      markGeoms = align({ modes: ['center', 'max', 'center'], relativeTo: [0, -offset, 0], grouped: true }, markGeoms)
    } else {
      const offsetX = textWidth + markGap
      const offsetY = textHeight

      markGeoms = align({ modes: ['min', 'min', 'center'], relativeTo: [offsetX, -offsetY, 0], grouped: true }, markGeoms)
    }

    // Use flat instead of spread because arrays can be non-arrays on single glyphs
    return [textGeoms, markGeoms].flat()
  })

  const instanceAtoms = options.instances.map((instanceOptions) => {
    return computed(() => {
      let geoms = $faceLayout.get()

      if (!geoms) return

      const globalFontScale = $fontScale.get()
      const localFontScale = $localFontScale.get()

      const instance = createDieFaceInstance($facesBaseGeom.get(), instanceOptions)
      const faceScale = instance.length * globalFontScale * localFontScale
      const rotation = (options.initialRotation ?? 0) + degToRad($rotation.get())

      geoms = rotateZ(rotation, geoms)
      geoms = translate([$offsetX.get(), $offsetY.get()], geoms)
      geoms = scale([faceScale, faceScale, $extrusionDepth.get()], geoms)
      geoms = transform(instance.rotationMatrix, geoms)
      geoms = translate(instance.center, geoms)

      return geoms
    })
  })

  return {
    name,
    $text,
    $mark,
    $isUnderscore,
    $markGap,
    $rotation,
    $offsetX,
    $offsetY,
    instanceAtoms,
  }
}
