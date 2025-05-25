import type { ComboboxData, ComboboxItem } from '@mantine/core'
import type { FontInfo } from '~/appState'
import { useAppState } from '~/appState'
import { createContext } from '~/utils/createContext'
import { useBuiltInFonts } from './BuiltInFontsContext'

export interface CombinedFonts {
  data: ComboboxData
  findFont: (id: FontInfo['id']) => FontInfo
}

function collectFontItems(fonts: FontInfo[]) {
  return fonts.map<ComboboxItem>(info => ({ value: info.id.toString(), label: info.font.fullName }))
}

export const { useCombinedFonts, CombinedFontsProvider } = createContext('CombinedFonts', () => {
  const builtInFonts = useBuiltInFonts()
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
