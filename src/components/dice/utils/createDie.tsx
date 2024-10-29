import type { FC } from 'react'
import type { DieConfig, DieInputConfig } from './types'
import { memo } from 'react'
import { AbstractDie } from '../AbstractDie'
import { createDieInfo } from './createDieInfo'
import { useDiceRegistry } from './registry'

export function createDie<T extends Record<string, DieInputConfig>>(
  config: DieConfig<T>,
): FC {
  const info = createDieInfo(config)

  return memo(() => {
    useDiceRegistry(info)

    return <AbstractDie info={info} />
  })
}
