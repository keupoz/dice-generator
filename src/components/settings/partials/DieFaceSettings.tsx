import type { FaceInfo } from '~/dice/utils/types'
import { SimpleGrid } from '@mantine/core'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { StoreSVGSelect } from '~/components/ui/StoreSVGSelect'
import { StoreSwitch } from '~/components/ui/StoreSwitch'
import { SUFFIX_DEG, SUFFIX_EM } from '~/consts'

export interface DieFaceSettingsProps {
  info: FaceInfo
}

export function DieFaceSettings({ info }: DieFaceSettingsProps) {
  return (
    <>
      <SimpleGrid cols={2} spacing="xs">
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
      </SimpleGrid>

      <StoreSwitch
        store={info.store}
        storeProp="isUnderscore"
        label="Align mark as underscore"
      />

      <StoreSlider
        store={info.store}
        storeProp="markGap"
        label="Gap"
        suffix={SUFFIX_EM}
        min={-2}
        max={2}
        step={0.1}
      />

      <StoreSlider
        store={info.store}
        storeProp="rotation"
        label="Rotation"
        suffix={SUFFIX_DEG}
        min={0}
        max={360}
        step={1}
      />

      <SimpleGrid cols={2} spacing="xs">
        <StoreSlider
          store={info.store}
          storeProp="offsetX"
          label="Offset X"
          suffix={SUFFIX_EM}
          min={-2}
          max={2}
          step={0.01}
        />

        <StoreSlider
          store={info.store}
          storeProp="offsetY"
          label="Offset Y"
          suffix={SUFFIX_EM}
          min={-2}
          max={2}
          step={0.01}
        />
      </SimpleGrid>
    </>
  )
}
