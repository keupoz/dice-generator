import { useAtomValue } from '@atomous/react'
import { Divider, Text, Title } from '@mantine/core'
import { FontCard } from '~/components/FontCard'
import { PresetCard } from '~/components/PresetCard'
import { SVGCard } from '~/components/svg-card/SVGCard'
import { $userFonts } from '~/state/fonts'
import { $presets } from '~/state/presets'
import { $svgs } from '~/state/svgs'

export function FilesTab() {
  const presetsObject = useAtomValue($presets)
  const fontsObject = useAtomValue($userFonts)
  const svgsObject = useAtomValue($svgs)

  const presets = Object.values(presetsObject)
  const fonts = Object.values(fontsObject)
  const svgs = Object.values(svgsObject)

  return (
    <>
      <Title order={3}>Presets</Title>

      {presets.length
        ? presets.map(preset => <PresetCard key={preset.name} preset={preset} />)
        : <Text c="dimmed" ta="center">No presets loaded</Text>}

      <Divider />

      <Title order={3}>Fonts</Title>

      {fonts.length
        ? fonts.map(font => <FontCard key={font.name} font={font} />)
        : <Text c="dimmed" ta="center">No fonts loaded</Text>}

      <Divider />

      <Title order={3}>SVGs</Title>

      {svgs.length
        ? svgs.map(svg => <SVGCard key={svg.id} svg={svg} />)
        : <Text c="dimmed" ta="center">No SVGs loaded</Text>}
    </>
  )
}
