import { Divider, Text, Title } from '@mantine/core'
import { useAppState } from '~/appState'
import { FontCard } from '~/components/ui/FontCard'
import { SVGCard } from '~/components/ui/SVGCard'
import { SettingsTabContent } from '../SettingsTabContent'

export function FilesTab() {
  const fonts = useAppState(state => state.userFonts)
  const svgs = useAppState(state => state.userSVGs)

  return (
    <SettingsTabContent value="files">
      <Title order={3}>Fonts</Title>

      {fonts.length === 0
        ? <Text c="gray">No fonts loaded</Text>
        : fonts.map(info => <FontCard key={info.id} info={info} />)}

      <Divider />

      <Title order={3}>SVGs</Title>

      {svgs.length === 0
        ? <Text c="gray">No SVGs loaded</Text>
        : svgs.map(svg => <SVGCard key={svg.id} info={svg} />)}
    </SettingsTabContent>
  )
}
