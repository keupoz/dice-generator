import type { ComboboxData } from '@mantine/core'
import type { Font } from 'fontkit'
import { useAppState } from '~/appState'
import { createContext } from '~/utils/createContext'
import { useBuiltInFonts } from './BuiltInFontsContext'

export interface CombinedFonts {
  data: ComboboxData
  findFont: (name: string) => Font
}

export const { useCombinedFonts, CombinedFontsProvider } = createContext('CombinedFonts', () => {
  const builtInFonts = useBuiltInFonts()
  const userFonts = useAppState(state => state.userFonts)

  const builtinFontNames = builtInFonts.map(font => font.fullName)
  const userFontNames = userFonts.map(font => font.fullName)

  const data: ComboboxData = [
    { group: 'Built-in fonts', items: builtinFontNames },
    { group: 'User fonts', items: userFontNames },
  ]

  const allFonts = [...userFonts, ...builtInFonts]

  function findFont(name: string) {
    const font = allFonts.find(font => font.fullName === name)

    if (font === undefined) {
      throw new Error(`Unknown font name "${name}"`)
    }

    return font
  }

  const result: CombinedFonts = {
    data,
    findFont,
  }

  return result
})
