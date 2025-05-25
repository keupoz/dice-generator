import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { FaceInfo } from '~/dice/utils/types'
import type { FixedFont, FontVariationSettings } from '~/fontkit'
import { Fragment, memo, useMemo } from 'react'
import { degToRad } from 'three/src/math/MathUtils.js'
import { useStore } from 'zustand'
import { useAppState } from '~/appState'
import { useUpdateCSG } from '~/components/three/csg/CSGContext'
import { useApp } from '~/providers/app/AppProvider'
import { useCombinedFonts } from '~/providers/CombinedFontsProvider'
import { FaceLayout } from './FaceLayout'
import { FaceText } from './FaceText'
import { useInfos } from './useInfos'

export interface DieFaceProps {
  info: FaceInfo
  geom: Geom3
  fontScale: number
}

function getFont(font: FixedFont, settings: FontVariationSettings) {
  if (Object.keys(settings).length === 0) {
    return font
  }

  return font.getVariation(settings)
}

export const DieFace = memo<DieFaceProps>(({ info, geom, fontScale }) => {
  useUpdateCSG()

  const { currentFontsStore } = useApp()

  const userRotation = useStore(info.store, state => state.rotation)
  const offsetX = useStore(info.store, state => state.offsetX)
  const offsetY = useStore(info.store, state => state.offsetY)
  const isUnderscore = useStore(info.store, state => state.isUnderscore)
  const markGap = useStore(info.store, state => state.markGap)
  const text = useStore(info.store, state => state.text)
  const mark = useStore(info.store, state => state.mark)

  const { findFont } = useCombinedFonts()

  const textFontId = useStore(currentFontsStore, state => state.textFontId)
  const markFontId = useStore(currentFontsStore, state => state.markFontId)

  const textSettings = useStore(currentFontsStore, state => state.textSettings)
  const markSettings = useStore(currentFontsStore, state => state.markSettings)

  const textFont = useMemo(() => getFont(findFont(textFontId).font, textSettings), [findFont, textFontId, textSettings])
  const markFont = useMemo(() => getFont(findFont(markFontId).font, markSettings), [findFont, markFontId, markSettings])

  const textFeatures = useStore(currentFontsStore, state => state.textFeatures)
  const markFeatures = useStore(currentFontsStore, state => state.markFeatures)

  const globalFontScale = useAppState(state => state.fontScale)
  const textDepth = useAppState(state => state.textDepth)

  const infos = useInfos(info.config.instances, geom)

  return infos.map((subInfo, i) => {
    const scale = subInfo.length * globalFontScale * fontScale
    const rotation = (info.config.localRotation ?? 0) + degToRad(userRotation)

    return (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={i}>
        <group position={subInfo.center}>
          <group {...subInfo.rotationMatrix}>
            <group scale-x={scale} scale-y={scale} scale-z={textDepth}>
              <group position-x={offsetX} position-y={offsetY}>
                <group rotation-z={rotation}>
                  <FaceLayout
                    isUnderscore={isUnderscore}
                    markGap={markGap}
                  >
                    <FaceText
                      text={text}
                      font={textFont}
                      features={textFeatures}
                    />

                    <FaceText
                      text={mark}
                      font={markFont}
                      features={markFeatures}
                    />
                  </FaceLayout>
                </group>
              </group>
            </group>
          </group>
        </group>
      </Fragment>
    )
  })
})
