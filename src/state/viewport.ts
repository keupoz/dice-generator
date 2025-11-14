import { BooleanStorage, NumberStorage, persistent } from '@atomous/persistent'
import { atom } from 'atomous'

export const $showGrid = persistent(true, new BooleanStorage('show-grid'))
export const $smoothCamera = persistent(true, new BooleanStorage('smooth-camera'))
export const $baseOpacity = persistent(0.8, new NumberStorage('dice:base-opacity'))
export const $enableWireframe = atom(false)
