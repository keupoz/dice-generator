import { Divider, Text, Title } from '@mantine/core'
import { useAtom } from '~/atoms/useAtom'
import { FontCard } from '~/components/FontCard'
import { SVGCard } from '~/components/svg-card/SVGCard'
import { $userFonts } from '~/state/fonts'
import { $svgs } from '~/state/svgs'

export function FilesTab() {
  const fontsObject = useAtom($userFonts)
  const svgsObject = useAtom($svgs)

  const fonts = Object.values(fontsObject)
  const svgs = Object.values(svgsObject)

  return (
    <>
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
