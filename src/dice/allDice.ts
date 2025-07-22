import type { Object3D } from 'three'
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

interface DieRow {
  maxDepth: number
  objects: (Object3D | undefined)[]
}

function calculateDiceGrid() {
  const box = new Box3()
  const size = new Vector3()

  let maxWidth = 0

  const rows = DICE_GROUPED.map((dice) => {
    const row: DieRow = {
      maxDepth: 0,
      objects: [],
    }

    for (const die of dice) {
      const object = die.$output.get()
      row.objects.push(object)

      if (object) {
        box.setFromObject(object, true)
        box.getSize(size)

        maxWidth = Math.max(maxWidth, size.x)
        row.maxDepth = Math.max(row.maxDepth, size.z)
      }
    }

    return row
  })

  return { maxWidth, rows }
}

function arrangeDice({ maxWidth, rows }: ReturnType<typeof calculateDiceGrid>) {
  const objects: Object3D[] = []

  let offsetX = 0
  let offsetY = 0

  for (const row of rows) {
    offsetX = 0
    offsetY += row.maxDepth / 2

    for (const object of row.objects) {
      offsetX += maxWidth / 2

      if (object) {
        const group = new Group()
        group.add(object)
        group.position.x = offsetX
        group.position.z = offsetY
        objects.push(group)
      }

      offsetX += (maxWidth / 2) + 8
    }

    offsetY += (row.maxDepth / 2) + 8
  }

  return objects
}

export const $diceOutput = computed(() => {
  const grid = calculateDiceGrid()
  const objects = arrangeDice(grid)
  const result = new Group()

  if (objects.length) {
    result.add(...objects)
  }

  console.log('output')

  return result
})
