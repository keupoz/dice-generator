import type { Font } from 'fontkit'
import type { Object3D, Path } from 'three'
import { AVAILABLE_OPERATIONS } from './components/three/csg/availableOperations'
import { createPersistStore } from './utils/createPersistStore'
import { getFirstItem } from './utils/getFirstItem'

export interface FontInfo {
  id: string
  font: Font
}

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

export interface AppState {
  userFonts: FontInfo[]
  userSVGs: SVGInfo[]

  showGrid: boolean
  smoothCamera: boolean
  baseOpacity: number
  enableWireframe: boolean

  fontSegments: number
  fontScale: number
  svgScale: number
  textDepth: number

  enableAlign: boolean
  enableRender: boolean
  renderOperation: string
  renderEngine: string
}

export const [appState, useAppState] = createPersistStore<AppState>('app-state', () => ({
  userFonts: [],
  userSVGs: [],

  showGrid: true,
  smoothCamera: true,
  baseOpacity: 0.9,
  enableWireframe: false,

  fontSegments: 4,
  fontScale: 0.75,
  svgScale: 0.75,
  textDepth: 0.75,

  enableAlign: true,
  enableRender: false,
  renderOperation: getFirstItem(Object.keys(AVAILABLE_OPERATIONS)),
  renderEngine: 'Manifold',
}), state => ({
  showGrid: state.showGrid,
  smoothCamera: state.smoothCamera,
  baseOpacity: state.baseOpacity,

  fontSegments: state.fontSegments,
  fontScale: state.fontScale,
  svgScale: state.svgScale,
  textDepth: state.textDepth,

  enableAlign: state.enableAlign,
  renderOperation: state.renderOperation,
  renderEngine: state.renderEngine,
}))

export const setAppState = appState.setState
export const getAppState = appState.getState

let exportObject: Object3D | null = null

export function setExportObject(value: Object3D | null) {
  exportObject = value
}

export function getExportObject() {
  return exportObject
}
