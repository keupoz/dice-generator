import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import { useMemo } from 'react'
import type { InstanceFaceConfig } from '~/utils/faces/getInstanceFaceInfo'
import { getInstanceFaceInfo } from '~/utils/faces/getInstanceFaceInfo'

export function useInfos(instances: InstanceFaceConfig[], geom: Geom3) {
  return useMemo(() => {
    return instances.map((config) => {
      return getInstanceFaceInfo(geom, config)
    })
  }, [instances, geom])
}
