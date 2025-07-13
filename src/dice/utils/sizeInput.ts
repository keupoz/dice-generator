import type { DieInputOptions } from './types'
import { SUFFIX_MM } from '~/consts'

export function sizeInput(defaultValue: number, label: string): DieInputOptions {
  return { defaultValue, min: 1, max: 40, step: 1, label, suffix: SUFFIX_MM }
}
