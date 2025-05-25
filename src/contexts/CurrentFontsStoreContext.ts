import type { FontInfo } from '~/appState'
import type { FixedFont, FontVariationSettings } from '~/fontkit'
import { collectFeatures } from '~/utils/collectFontFeatures'
import { createStoreContext } from '~/utils/createStoreContext'
import { getFirstItem } from '~/utils/getFirstItem'
import { useBuiltInFonts } from './BuiltInFontsContext'

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

export const { useCurrentFontsStore, CurrentFontsStoreProvider } = createStoreContext('CurrentFonts', () => {
  const fonts = useBuiltInFonts()
  const info = getFirstItem(fonts)
  const settings = collectVariationSettings(info.font)
  const features = collectFeatures(info.font)

  const initialState: CurrentFontsState = {
    textFontId: info.id,
    markFontId: info.id,

    textSettings: settings,
    markSettings: settings,

    textFeatures: features,
    markFeatures: features,
  }

  return initialState
})
