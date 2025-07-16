import type { DieResult } from './utils/createDie'
import { cluster, mapKeys } from 'radashi'
import { Box3, Group, Vector3 } from 'three'
import { computed } from '~/atoms/computed'
import { alphabetical } from '~/utils/array/alphabetical'

function toSortedArray(object: Record<string, DieResult>) {
  return alphabetical(Object.values(object), die => die.name)
}

export const DICE = mapKeys(import.meta.glob<DieResult>('./DieD*', { eager: true, import: 'default' }), (path, die) => die.name)
export const DICE_SORTED = toSortedArray(DICE)
export const DICE_GROUPED = cluster(DICE_SORTED, 3)
export const DIE_NAMES = DICE_SORTED.map(die => die.name)

export const $diceOutput = computed((get) => {
  let maxSize = new Vector3()

  for (const group of DICE_GROUPED) {
    for (const die of group) {
      const object = get(die.$output)
      if (!object) continue

      const box = new Box3().setFromObject(object)
      const size = box.getSize(new Vector3())

      maxSize = maxSize.max(size)
    }
  }

  const allGroups = DICE_GROUPED.map((group, i) => {
    const dieGroups = group.map((die, j) => {
      const object = get(die.$output)
      if (!object) return null

      const result = new Group()
      result.add(object)

      result.position.x = maxSize.x * 1.5 * j
      result.position.z = maxSize.z

      return result
    })

    const result = new Group()
    const filteredDieGroups = dieGroups.filter(dieGroup => dieGroup !== null)

    if (filteredDieGroups.length) {
      result.add(...filteredDieGroups)
    }

    result.position.x = maxSize.x
    result.position.z = maxSize.z * i

    return result
  })

  const result = new Group()
  result.add(...allGroups)

  return result
})
