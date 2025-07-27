import type { InferInput } from 'valibot'
import type { CurrentFontSchema, DieSchema, FaceTextSchema, PresetSchema } from './schema'
import type { DieFaceResult } from '~/dice/utils/createDieFace'
import type { CurrentFontAtoms } from '~/state/fonts'
import type { SVGResult } from '~/state/svgs'
import { saveAs } from 'file-saver'
import { DICE_SORTED } from '~/dice/allDice'
import { $blanksGap } from '~/state/dice'
import { $extrusionDepth, $segments } from '~/state/faces'
import { $fontScale, currentMarkFont, currentTextFont } from '~/state/fonts'
import { $renderEngine, $renderOperation } from '~/state/render'
import { $svgScale } from '~/state/svgs'
import { generateFilename } from '../generateFilename'

function exportCurrentFont(atoms: CurrentFontAtoms): InferInput<typeof CurrentFontSchema> | undefined {
  const font = atoms.$baseFont.get()

  if (font === undefined) return undefined

  return {
    name: font.name,
    variationSettings: atoms.$variationSettings.get(),
    features: atoms.$features.get(),
  }
}

function exportFaceText(atom: DieFaceResult['$text' | '$mark'], svgsOutput: Set<SVGResult>): InferInput<typeof FaceTextSchema> {
  const value = atom.get()

  if (typeof value === 'string') {
    return {
      type: 'text',
      value,
    }
  }

  svgsOutput.add(value)

  return {
    type: 'svg',
    value: value.id,
  }
}

export function exportPreset(name: string) {
  const collectedSVGs = new Set<SVGResult>()
  const dice: InferInput<typeof DieSchema>[] = DICE_SORTED.map(die => ({
    name: die.name,
    visible: die.$visible.get(),
    fontScale: die.$fontScale.get(),
    svgScale: die.$svgScale.get(),
    inputs: die.$inputs.get(),
    faces: die.faces.map(face => ({
      name: face.name,
      text: exportFaceText(face.$text, collectedSVGs),
      mark: exportFaceText(face.$mark, collectedSVGs),
      isUnderscore: face.$isUnderscore.get(),
      markGap: face.$markGap.get(),
      rotation: face.$rotation.get(),
      offsetX: face.$offsetX.get(),
      offsetY: face.$offsetY.get(),
    })),
  }))

  const preset: InferInput<typeof PresetSchema> = {
    name,
    general: {
      blanksGap: $blanksGap.get(),

      renderEngine: $renderEngine.get(),
      renderOperation: $renderOperation.get(),

      textFont: exportCurrentFont(currentTextFont),
      markFont: exportCurrentFont(currentMarkFont),

      segments: $segments.get(),
      fontScale: $fontScale.get(),
      svgScale: $svgScale.get(),
      extrusionDepth: $extrusionDepth.get(),

      svgs: [...collectedSVGs].map(svg => ({
        name: svg.fileName,
        lastModified: svg.lastModified,
        content: svg.raw,
      })),
    },

    dice,
  }

  const json = JSON.stringify(preset)
  saveAs(new Blob([json]), generateFilename('dice-preset', 'json', name))
}
