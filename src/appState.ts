import type { Font } from 'fontkit'
import type { Object3D, Path } from 'three'
import { create } from 'zustand'
import { AVAILABLE_EVALUATORS } from './components/three/csg/availableEvaluators'
import { AVAILABLE_OPERATIONS } from './components/three/csg/availableOperations'
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

  fontSegments: number
  fontScale: number
  svgScale: number
  textDepth: number

  enableAlign: boolean
  enableRender: boolean
  renderOperation: string
  renderMethod: string
}

export const useAppState = create<AppState>(() => ({
  userFonts: [],
  userSVGs: [],

  fontSegments: 4,
  fontScale: 0.75,
  svgScale: 0.75,
  textDepth: 0.75,

  enableAlign: true,
  enableRender: false,
  renderOperation: getFirstItem(Object.keys(AVAILABLE_OPERATIONS)),
  renderMethod: getFirstItem(Object.keys(AVAILABLE_EVALUATORS)),
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
