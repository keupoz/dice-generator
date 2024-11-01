import type { DieConfig, DieInfo, DieInputConfig } from './types'
import { createDieStore } from './createDieStore'
import { createFaceInfo } from './createFaceInfo'

export function createDieInfo<T extends Record<string, DieInputConfig>>(config: DieConfig<T>): DieInfo {
  const store = createDieStore(config)
  const faces = config.faces.map(createFaceInfo)

  return {
    object: null,
    config: config as unknown as DieInfo['config'],
    store,
    faces,
  }
}
