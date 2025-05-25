import type { FontInfo } from '~/appState'
import type { FixedFont, FontVariationSettings } from '~/fontkit'
import { createStore } from 'zustand'
import { collectFeatures } from '~/utils/collectFontFeatures'
import { getFirstItem } from '~/utils/getFirstItem'

export interface CurrentFontsState {
  textFontId: FontInfo['id']
  markFontId: FontInfo['id']

  textSettings: FontVariationSettings
  markSettings: FontVariationSettings

  textFeatures: Record<string, boolean>
  markFeatures: Record<string, boolean>
}

function collectVariationSettings(font: FixedFont) {
  const result: FontVariationSettings = {}

  for (const [key, value] of Object.entries(font.variationAxes)) {
    result[key] = value.default
  }

  return result
}

export function initCurrentFontsStore(builtinFonts: FontInfo[]) {
  const info = getFirstItem(builtinFonts)
  const settings = collectVariationSettings(info.font)
  const features = collectFeatures(info.font)

  return createStore<CurrentFontsState>(() => ({
    textFontId: info.id,
    markFontId: info.id,

    textSettings: settings,
    markSettings: settings,

    textFeatures: features,
    markFeatures: features,
  }))
}
