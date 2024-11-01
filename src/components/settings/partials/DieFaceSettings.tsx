import type { FaceInfo } from '~/components/dice/utils/types'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { StoreSVGSelect } from '~/components/ui/StoreSVGSelect'
import { StoreSwitch } from '~/components/ui/StoreSwitch'

export interface DieFaceSettingsProps {
  info: FaceInfo
}

export function DieFaceSettings({ info }: DieFaceSettingsProps) {
  return (
    <>
      <StoreSVGSelect
        store={info.store}
        storeProp="text"
        label="Text"
      />

      <StoreSVGSelect
        store={info.store}
        storeProp="mark"
        label="Mark"
      />

      <StoreSwitch
        store={info.store}
        storeProp="isUnderscore"
        label="Align mark as underscore"
      />

      <StoreSlider
        store={info.store}
        storeProp="markGap"
        label="Gap"
        min={-2}
        max={2}
        step={0.1}
      />

      <StoreSlider
        store={info.store}
        storeProp="rotation"
        label="Rotation"
        min={0}
        max={360}
        step={1}
      />

      <StoreSlider
        store={info.store}
        storeProp="offsetX"
        label="Offset X"
        min={-2}
        max={2}
        step={0.01}
      />

      <StoreSlider
        store={info.store}
        storeProp="offsetY"
        label="Offset Y"
        min={-2}
        max={2}
        step={0.01}
      />
    </>
  )
}
