import type { Font } from 'fontkit'
import type { FixedFont, FontVariationSettings } from '~/lib/fontkit'
import { Buffer } from 'node:buffer'
import { atom, computed } from 'atomous'
import { create } from 'fontkit'
import { mapValues, objectify } from 'radashi'
import { $resources } from './resources'

export interface FontResult {
  name: string
  value: FixedFont
}

export type CurrentFontAtoms = ReturnType<typeof createCurrentFontAtom>

const DEFAULT_FEATURES = [
  'rvrn',
  'ltra',
  'ltrm',
  'frac',
  'numr',
  'dnom',
  'ccmp',
  'locl',
  'rlig',
  'mark',
  'mkmk',
  'calt',
  'clig',
  'liga',
  'rclt',
  'curs',
  'kern',
]

export const $builtinFonts = computed(() => {
  const resources = $resources.get()
  return resources.status === 'success' ? resources.data.fonts : {}
})

export const $userFonts = atom<Record<string, FontResult>>({})
export const $fontScale = atom(0.75)

function createCurrentFontAtom() {
  const $baseFontName = atom('Roboto')

  const $baseFont = computed(() => {
    const name = $baseFontName.get()
    return $userFonts.get()[name] ?? $builtinFonts.get()[name]
  })

  const $variationSettings = computed<FontVariationSettings>(() => {
    const baseFont = $baseFont.get()?.value
    if (!baseFont) return {}
    return mapValues(baseFont.variationAxes, value => value.default)
  })

  const $features = computed<Record<string, boolean>>(() => {
    const baseFont = $baseFont.get()?.value
    if (!baseFont) return {}
    return objectify(baseFont.availableFeatures, value => value, value => DEFAULT_FEATURES.includes(value))
  })

  const $currentFont = computed(() => {
    const baseFont = $baseFont.get()
    const variationSettings = $variationSettings.get()

    if (Object.keys(variationSettings).length === 0) return baseFont?.value

    return baseFont?.value.getVariation(variationSettings)
  })

  return {
    $baseFontName,
    $baseFont,
    $variationSettings,
    $currentFont,
    $features,
    set(name: string) {
      $baseFontName.set(name)
    },
    reset() {
      $variationSettings.reset()
      $features.reset()
    },
  }
}

export const currentTextFont = createCurrentFontAtom()
export const currentMarkFont = createCurrentFontAtom()

function getFontName(font: Font) {
  return font.fullName
}

function readFonts(arrayBuffers: ArrayBuffer[]) {
  const fonts: Record<string, FontResult> = {}

  for (const arrayBuffer of arrayBuffers) {
    const font = create(Buffer.from(arrayBuffer))

    if ('fonts' in font) {
      for (const item of font.fonts) {
        const name = getFontName(item)
        fonts[name] = { name, value: item as FixedFont }
      }
    } else {
      const name = getFontName(font)
      fonts[name] = { name, value: font as FixedFont }
    }
  }

  return fonts
}

export async function loadFonts(files: File[]) {
  const promises = files.map(file => file.arrayBuffer())
  const arrayBuffers = await Promise.all(promises)
  const fonts = readFonts(arrayBuffers)

  $userFonts.set({ ...$userFonts.get(), ...fonts })
}
