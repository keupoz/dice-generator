import { atom } from '~/atoms/atom'
import { DICE_SORTED } from '~/dice/allDice'

export const $currentDie = atom(DICE_SORTED[0])
export const $currentDieFace = atom($currentDie.get()?.faces[0])
