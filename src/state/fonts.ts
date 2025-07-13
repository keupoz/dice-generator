import type { Font } from 'fontkit'
import type { FixedFont, FontVariationSettings } from '~/lib/fontkit'
import { Buffer } from 'node:buffer'
import { create } from 'fontkit'
import { mapValues, objectify } from 'radashi'
import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { effect } from '~/atoms/effect'

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

export const $builtinFonts = atom<Record<string, FontResult>>({})
export const $userFonts = atom<Record<string, FontResult>>({})
export const $fontScale = atom(0.75)

function createCurrentFontAtom() {
  const $baseFont = atom<FontResult | undefined>(undefined)
  const $variationSettings = atom<FontVariationSettings>({})
  const $features = atom<Record<string, boolean>>({})

  function reset(font: FixedFont | undefined) {
    if (!font) {
      $variationSettings.set({})
      $features.set({})
      return
    }

    const variationSettings = mapValues(font.variationAxes, value => value.default)
    const features = objectify(font.availableFeatures, value => value, value => DEFAULT_FEATURES.includes(value))

    $variationSettings.set(variationSettings)
    $features.set(features)
  }

  effect((get) => {
    const fonts = get($userFonts)
    const latestFont = Object.values(fonts).at(-1)
    if (latestFont) $baseFont.set(latestFont)
  })

  effect(get => reset(get($baseFont)?.value))

  const $currentFont = computed((get) => {
    const baseFont = get($baseFont)
    const variationSettings = get($variationSettings)

    if (Object.keys(variationSettings).length === 0) return baseFont?.value

    return baseFont?.value.getVariation(variationSettings)
  })

  return {
    $baseFont,
    $variationSettings,
    $currentFont,
    $features,
    set(name: string) {
      const font = $userFonts.get()[name] ?? $builtinFonts.get()[name]
      $baseFont.set(font)
    },
    reset() {
      reset($baseFont.get()?.value)
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

export async function fetchFonts(urls: string[], defaultFontName: string) {
  const promises = urls.map(async (url) => {
    const r = await fetch(url)
    const arrayBuffer = await r.arrayBuffer()
    return arrayBuffer
  })

  const arrayBuffers = await Promise.all(promises)
  $builtinFonts.set(readFonts(arrayBuffers))

  currentTextFont.set(defaultFontName)
  currentMarkFont.set(defaultFontName)
}
