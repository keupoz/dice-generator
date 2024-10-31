import type { Font } from 'fontkit'
import { collectFeatures } from '~/utils/collectFontFeatures'
import { createStoreContext } from '~/utils/createStoreContext'
import { getFirstItem } from '~/utils/getFirstItem'
import { useBuiltInFonts } from './BuiltInFontsContext'

export interface CurrentFontsState {
  textFont: Font
  markFont: Font
  textFeatures: Record<string, boolean>
  markFeatures: Record<string, boolean>
}

export const { useCurrentFontsStore, CurrentFontsStoreProvider } = createStoreContext('CurrentFonts', () => {
  const fonts = useBuiltInFonts()
  const font = getFirstItem(fonts)
  const features = collectFeatures(font)

  const initialState: CurrentFontsState = {
    textFont: font,
    markFont: font,
    textFeatures: features,
    markFeatures: features,
  }

  return initialState
})
