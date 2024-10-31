import type { FC } from 'react'
import { Text, Title } from '@mantine/core'
import { useAppState } from '~/appState'
import { SVGCard } from '../partials/SVGCard'
import { SettingsTabContent } from '../SettingsTabContent'

export const FilesTab: FC = () => {
  const svgs = useAppState(state => state.userSVGs)

  return (
    <SettingsTabContent value="files">
      <Title order={2}>SVGs</Title>

      {svgs.length === 0
        ? (
            <Text c="gray">No SVGs loaded</Text>
          )
        : (
            svgs.map(svg => <SVGCard key={svg.id} info={svg} />)
          )}
    </SettingsTabContent>
  )
}
