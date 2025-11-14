import { BooleanStorage, EnumStorage, persistent } from '@atomous/persistent'
import { atom } from 'atomous'

export enum RenderOperation {
  Subtract = 'subtract',
  Union = 'union',
}

export enum RenderEngine {
  Manifold = 'manifold',
  ThreeBVH = 'threebvh',
  JSCAD = 'jscad',
}

export const $enableAlign = persistent(true, new BooleanStorage('dice:enable-align'))
export const $enableRender = atom(false)
export const $renderEngine = persistent(RenderEngine.Manifold, new EnumStorage('dice:render-engine', RenderEngine))
export const $renderOperation = persistent(RenderOperation.Subtract, new EnumStorage('dice:render-operation', RenderOperation))
