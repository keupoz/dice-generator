import type { Object3D } from 'three'
import type { DieResult } from './utils/createDie'
import { cluster, mapKeys } from 'radashi'
import { Group } from 'three'
import { computed } from '~/atoms/computed'
import { $extrusionDepth } from '~/state/faces'
import { $enableRender, $renderOperation, RenderOperation } from '~/state/render'
import { alphabetical } from '~/utils/array/alphabetical'

function toSortedArray(object: Record<string, DieResult>) {
  return alphabetical(Object.values(object), die => die.name)
}

export const DICE = mapKeys(import.meta.glob<DieResult>('./DieD*', { eager: true, import: 'default' }), (path, die) => die.name)
export const DICE_SORTED = toSortedArray(DICE)
export const DICE_GROUPED = cluster(DICE_SORTED, 3)
export const DIE_NAMES = DICE_SORTED.map(die => die.name)

interface DieRow {
  maxDepth: number
  dice: DieResult[]
}

const $diceGrid = computed((get) => {
  let maxWidth = 0

  const rows = DICE_GROUPED.map((dice) => {
    const row: DieRow = {
      maxDepth: 0,
      dice,
    }

    for (const die of dice) {
      const dimensions = get(die.$dimensions)
      maxWidth = Math.max(maxWidth, dimensions[0])
      row.maxDepth = Math.max(row.maxDepth, dimensions[1])
    }

    return row
  })

  return { maxWidth, rows }
})

const $arrangedDice = computed((get) => {
  const { maxWidth, rows } = get($diceGrid)
  const result: Object3D[] = []

  let offsetX = 0
  let offsetY = 0

  for (const row of rows) {
    offsetX = 0
    offsetY += row.maxDepth / 2

    for (const die of row.dice) {
      const object = get(die.$output)
      offsetX += maxWidth / 2

      if (object) {
        const group = new Group()
        group.add(object)
        group.position.x = offsetX
        group.position.z = offsetY
        result.push(group)
      }

      offsetX += (maxWidth / 2) + 8
    }

    offsetY += (row.maxDepth / 2) + 8
  }

  return result
})

export const $diceOutput = computed((get) => {
  const objects = get($arrangedDice)
  const result = new Group()

  if (get($enableRender) && get($renderOperation) === RenderOperation.Union) {
    const offsetY = get($extrusionDepth)
    result.position.y = offsetY
  } else {
    result.position.y = 0
  }

  if (objects.length) {
    result.add(...objects)
  }

  return result
})
