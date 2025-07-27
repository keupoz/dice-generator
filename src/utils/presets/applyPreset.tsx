import type { InferOutput } from 'valibot'
import type { CurrentFontSchema, FaceTextSchema, PresetSchema } from './schema'
import type { DieFaceResult } from '~/dice/utils/createDieFace'
import type { CurrentFontAtoms } from '~/state/fonts'
import { List, ListItem, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { objectify } from 'radashi'
import { DICE } from '~/dice/allDice'
import { $blanksGap } from '~/state/dice'
import { $extrusionDepth, $segments } from '~/state/faces'
import { $builtinFonts, $fontScale, $userFonts, currentMarkFont, currentTextFont } from '~/state/fonts'
import { $renderEngine, $renderOperation } from '~/state/render'
import { $svgs, $svgScale, loadSVGs } from '~/state/svgs'

function getFont(name: string | undefined) {
  if (name === undefined) return

  return $userFonts.get()[name] ?? $builtinFonts.get()[name]
}

function findMissingDependencies(preset: InferOutput<typeof PresetSchema>) {
  const missingFonts: string[] = []

  const textFontName = preset.general.textFont?.name
  const markFontName = preset.general.markFont?.name

  if (textFontName && !getFont(textFontName)) missingFonts.push(textFontName)
  if (markFontName && !getFont(markFontName)) missingFonts.push(markFontName)

  if (missingFonts.length) {
    return {
      fonts: missingFonts,
    }
  }
}

function applyCurrentFontPreset(preset: InferOutput<typeof CurrentFontSchema> | undefined, atoms: CurrentFontAtoms) {
  if (!preset) return

  atoms.set(preset.name)
  atoms.$variationSettings.set(preset.variationSettings)
  atoms.$features.set(preset.features)
}

function applyFaceText(preset: InferOutput<typeof FaceTextSchema>, atom: DieFaceResult['$text' | '$mark']) {
  switch (preset.type) {
    case 'svg': {
      const svg = $svgs.get()[preset.value]
      if (!svg) throw new Error(`No svg "${preset.value}"`)
      atom.set(svg)
      break
    }
    case 'text': {
      atom.set(preset.value)
      break
    }
  }
}

export async function applyPreset(preset: InferOutput<typeof PresetSchema>) {
  const missingDependencies = findMissingDependencies(preset)

  if (missingDependencies) {
    modals.openConfirmModal({
      title: 'Some dependencies required',
      children: (
        <Stack gap="xs">
          <Text>Preset "{preset.name}" requires some dependencies that are not loaded:</Text>
          <List>
            {!!missingDependencies.fonts.length && <ListItem>Fonts: {missingDependencies.fonts.join(', ')}</ListItem>}
          </List>
          <Text>Resolve the issues and try again.</Text>
        </Stack>
      ),
      labels: { confirm: 'Retry', cancel: 'Cancel' },
      onConfirm: () => applyPreset(preset),
    })
  } else {
    const svgs = preset.general.svgs.map(svg => new File([svg.content], svg.name, { lastModified: svg.lastModified }))
    await loadSVGs(svgs)

    $blanksGap.set(preset.general.blanksGap)

    $renderEngine.set(preset.general.renderEngine)
    $renderOperation.set(preset.general.renderOperation)

    applyCurrentFontPreset(preset.general.textFont, currentTextFont)
    applyCurrentFontPreset(preset.general.markFont, currentMarkFont)

    $segments.set(preset.general.segments)
    $fontScale.set(preset.general.fontScale)
    $svgScale.set(preset.general.svgScale)
    $extrusionDepth.set(preset.general.extrusionDepth)

    for (const diePreset of preset.dice) {
      const die = DICE[diePreset.name]
      if (!die) continue

      die.$visible.set(diePreset.visible)
      die.$fontScale.set(diePreset.fontScale)
      die.$svgScale.set(diePreset.svgScale ?? preset.general.svgScale)
      die.$inputs.set(diePreset.inputs)

      const dieFaces = objectify(die.faces, face => face.name)

      for (const facePreset of diePreset.faces) {
        const face = dieFaces[facePreset.name]
        if (!face) continue

        applyFaceText(facePreset.text, face.$text)
        applyFaceText(facePreset.mark, face.$mark)

        face.$isUnderscore.set(facePreset.isUnderscore)
        face.$markGap.set(facePreset.markGap)
        face.$rotation.set(facePreset.rotation)
        face.$offsetX.set(facePreset.offsetX)
        face.$offsetY.set(facePreset.offsetY)
      }
    }
  }
}
