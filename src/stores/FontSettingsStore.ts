import type { Font } from 'fontkit'
import type { Path } from 'three'
import { create } from 'zustand'

export interface SVGInfo {
  id: number
  name: string
  lastModified: number
  fileSize: number
  raw: string
  paths: Path[]
  scaleByViewbox: boolean
  viewboxScale: number | null
}

interface FontsStoreState {
  fonts: Font[]
  svgs: SVGInfo[]
}

interface FontSettingsState {
  segments: number
  fontScale: number
  svgScale: number
  depth: number
}

export const useFontsStore = create<FontsStoreState>(() => ({
  fonts: [],
  svgs: [],
}))

export const useFontSettings = create<FontSettingsState>(() => ({
  segments: 4,
  fontScale: 0.75,
  svgScale: 0.75,
  depth: 0.75,
}))
