import type { DieInfo } from '~/dice/utils/types'
import { Box } from '@react-three/flex'
import { useMemo } from 'react'
import { Brush } from 'three-bvh-csg'
import { useStore } from 'zustand'
import { useAppState } from '~/appState'
import { AlignBottom } from '~/components/three/AlignBottom'
import { CSG } from '~/components/three/csg/CSG'
import { useMaterials } from '~/providers/MaterialsProvider'
import { cad2geometry } from '~/utils/cad2three'
import { getInstanceFaceInfo } from '~/utils/faces/getInstanceFaceInfo'
import { getFirstItem } from '~/utils/getFirstItem'
import { DieFace } from './DieFace/DieFace'

export interface DieProps {
  info: DieInfo
}

export function Die({ info }: DieProps) {
  const visible = useStore(info.store, state => state.visible)
  const size = useStore(info.store, state => state.size)
  const fontScale = useStore(info.store, state => state.fontScale)
  const extraOptions = useStore(info.store, state => state.extraOptions)

  const { baseMaterial } = useMaterials()

  const baseGeom = useMemo(() => {
    return info.config.base({ size, ...extraOptions })
  }, [extraOptions, info.config, size])

  const facesGeom = useMemo(() => {
    return info.config.facesBase?.({ size, ...extraOptions })
  }, [extraOptions, info.config, size])

  const baseBrush = useMemo(() => {
    return new Brush(cad2geometry(baseGeom), baseMaterial)
  }, [baseGeom, baseMaterial])

  const enableAlign = useAppState(state => state.enableAlign)
  const enableRender = useAppState(state => state.enableRender)

  const alignMatrix = useMemo(() => {
    if (!enableAlign) {
      return null
    }

    const alignFaceConfig = info.config.faces[info.config.alignFaceIndex ?? -1]

    if (!alignFaceConfig) {
      return null
    }

    const instance = getFirstItem(alignFaceConfig.instances)
    const faceInfo = getInstanceFaceInfo(facesGeom ?? baseGeom, instance, info.config.invertAlignMatrix)

    return faceInfo.rotationMatrix
  }, [baseGeom, enableAlign, facesGeom, info.config.alignFaceIndex, info.config.faces, info.config.invertAlignMatrix])

  return (
    // @ts-expect-error Outdated types of the lib
    <Box
      centerAnchor
      padding={15}
      visible={visible}
      ref={(value) => {
        info.object = value
      }}
    >
      <AlignBottom
        disabled={!enableAlign}
        alignBy={enableRender ? null : baseBrush}
      >
        <group rotation-x={-Math.PI / 2}>
          <group {...alignMatrix}>
            <CSG disabled={!enableRender}>
              {/* Wrapped to make its position in the tree persistent */}
              <group>
                <primitive object={baseBrush} />
              </group>

              {info.faces.map(info => (
                <DieFace
                  key={info.name}
                  info={info}
                  fontScale={fontScale}
                  geom={facesGeom ?? baseGeom}
                />
              ))}
            </CSG>
          </group>
        </group>
      </AlignBottom>
    </Box>
  )
}
