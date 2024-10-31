import type { Font } from 'fontkit'
import type { Object3D, Path } from 'three'
import { AVAILABLE_EVALUATORS } from './components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from './components/three/csg/availableOperations'
import { createPersistStore } from './utils/createPersistStore'
import { getFirstItem } from './utils/getFirstItem'

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
  userFonts: Font[]
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
  renderMethod: string
}

export const useAppState = createPersistStore<AppState>('app-state', () => ({
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
  renderMethod: getFirstItem(Object.keys(AVAILABLE_EVALUATORS)),
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
  renderMethod: state.renderMethod,
}))

export const setAppState = useAppState.setState
export const getAppState = useAppState.getState

let exportObject: Object3D | null = null

export function setExportObject(value: Object3D | null) {
  exportObject = value
}

export function getExportObject() {
  return exportObject
}
