import type { DieInfo } from './utils/types'
import { splitArray } from '~/utils/splitArray'

function toSortedArray(object: Record<string, DieInfo>) {
  const sorted = Object.entries(object).sort(([path1], [path2]) => {
    return path1.localeCompare(path2, undefined, { numeric: true, sensitivity: 'base' })
  })

  return sorted.map(([_path, info]) => info)
}

export const DICE = toSortedArray(import.meta.glob<DieInfo>('./DieD*', { eager: true, import: 'default' }))
export const DICE_GROUPED = splitArray(DICE, 3)
export const DIE_NAMES = DICE.map(info => info.config.name)
