import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { $extrusionDepth } from './faces'

export const $enableDice = atom(true)
export const $enableBlanks = atom(false)
export const $blanksGap = atom(0.25)

export const $blanksDelta = computed(() => {
  return $extrusionDepth.get() + $blanksGap.get()
})
