import type { Geom3 } from '@jscad/modeling/src/geometries/types'

export interface DieInputOptions {
  defaultValue: number
  min: number
  max: number
  step: number
  label: string
  suffix?: string
}

export type DieInputValues<TInputs extends Record<string, DieInputOptions>> = {
  [TKey in keyof TInputs]: number
}

export type GeomBuilder<TInputValues extends Record<string, number>> = (inputs: TInputValues) => Geom3

export interface IndexTarget {
  type: 'edge' | 'vertex'
  index: number
}

export interface CenterTarget {
  type: 'center'
}

export type DieFaceTarget = IndexTarget | CenterTarget

export interface DieFaceInstanceOptions {
  faceIndex: number
  polygonCenter?: boolean
  from: DieFaceTarget
  to: DieFaceTarget
  t?: number
}

export interface DieFaceOptions {
  text?: string
  initialRotation?: number
  instances: DieFaceInstanceOptions[]
}

export interface DieOptions<TInputs extends Record<string, DieInputOptions>> {
  name: string
  defaultFontScale?: number
  inputs: TInputs
  buildBase: GeomBuilder<DieInputValues<TInputs>>
  buildFacesBase?: GeomBuilder<DieInputValues<TInputs>>
  faces: DieFaceOptions[]
}
