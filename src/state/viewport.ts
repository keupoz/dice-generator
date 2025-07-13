import { boolean, number } from 'valibot'
import { atom } from '~/atoms/atom'
import { persistent } from '~/atoms/persistent'

export const $showGrid = persistent('show-grid', true, boolean())
export const $smoothCamera = persistent('smooth-camera', true, boolean())
export const $baseOpacity = persistent('dice:base-opacity', 0.9, number())
export const $enableWireframe = atom(false)
