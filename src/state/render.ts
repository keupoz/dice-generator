import { boolean, enum_ } from 'valibot'
import { atom } from '~/atoms/atom'
import { persistent } from '~/atoms/persistent'

export enum RenderOperation {
  Subtract = 'subtract',
  Union = 'union',
}

export enum RenderEngine {
  Manifold = 'manifold',
  ThreeBVH = 'threebvh',
  JSCAD = 'jscad',
}

export const $enableAlign = persistent('dice:enable-align', true, boolean())
export const $enableRender = atom(false)
export const $renderEngine = persistent('dice:render-engine', RenderEngine.Manifold, enum_(RenderEngine))
export const $renderOperation = persistent('dice:render-operation', RenderOperation.Subtract, enum_(RenderOperation))
