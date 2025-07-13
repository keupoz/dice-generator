import type { DieFaceResult } from '~/dice/utils/createDieFace'
import { SimpleGrid } from '@mantine/core'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { AtomSVGSelect } from '~/components/inputs/AtomSVGSelect'
import { AtomSwitch } from '~/components/inputs/AtomSwitch'
import { SUFFIX_DEG, SUFFIX_EM } from '~/consts'

export interface DieFaceSettingsProps {
  face: DieFaceResult
}

export function DieFaceSettings({ face }: DieFaceSettingsProps) {
  return (
    <>
      <SimpleGrid cols={2} spacing="xs">
        <AtomSVGSelect atom={face.$text} label="Text" />
        <AtomSVGSelect atom={face.$mark} label="Mark" />
      </SimpleGrid>

      <AtomSwitch atom={face.$isUnderscore} label="Align mark as underscore" />
      <AtomSlider atom={face.$markGap} label="Mark gap" min={-2} max={2} step={0.1} suffix={SUFFIX_EM} />
      <AtomSlider atom={face.$rotation} label="Rotation" min={0} max={360} step={1} suffix={SUFFIX_DEG} />

      <SimpleGrid cols={2} spacing="xs">
        <AtomSlider atom={face.$offsetX} label="Offset X" min={-2} max={2} step={0.1} suffix={SUFFIX_EM} />
        <AtomSlider atom={face.$offsetY} label="Offset Y" min={-2} max={2} step={0.1} suffix={SUFFIX_EM} />
      </SimpleGrid>
    </>
  )
}
