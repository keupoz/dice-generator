import { atom } from 'atomous'
import { DICE_SORTED } from '~/dice/allDice'

export const $currentDie = atom(DICE_SORTED[0])
export const $currentDieFace = atom(DICE_SORTED[0]?.faces[0])
