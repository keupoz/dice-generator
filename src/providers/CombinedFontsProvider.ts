import type { ComboboxData, ComboboxItem } from '@mantine/core'
import type { FontInfo } from '~/appState'
import { useAppState } from '~/appState'
import { createProvider } from '~/utils/react/createProvider'
import { useApp } from './app/AppProvider'

export interface CombinedFonts {
  data: ComboboxData
  findFont: (id: FontInfo['id']) => FontInfo
}

function collectFontItems(fonts: FontInfo[]) {
  return fonts.map<ComboboxItem>(info => ({ value: info.id.toString(), label: info.font.fullName }))
}

export const [CombinedFontsProvider, useCombinedFonts] = createProvider(() => {
  const { builtInFonts } = useApp()
  const userFonts = useAppState(state => state.userFonts)

  const builtiInItems = collectFontItems(builtInFonts)
  const userFontItems = collectFontItems(userFonts)

  const allFonts = [...userFonts, ...builtInFonts]

  const result: CombinedFonts = {
    data: [
      { group: 'Built-in fonts', items: builtiInItems },
      { group: 'User fonts', items: userFontItems },
    ],
    findFont(id) {
      const info = allFonts.find(info => info.id === id)

      if (info === undefined) {
        throw new Error(`Unknown font ID "${id}"`)
      }

      return info
    },
  }

  return result
})
