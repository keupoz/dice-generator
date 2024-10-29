import type { FC } from 'react'
import { LargeText } from '~/shadcn/components/typography/large-text'
import { MutedText } from '~/shadcn/components/typography/muted-text'
import { useFontsStore } from '~/stores/FontSettingsStore'
import { SVGCard } from '../partials/SVGCard'
import { SettingsTabContent } from '../SettingsTabContent'

export const FilesTab: FC = () => {
  const svgs = useFontsStore(state => state.svgs)

  return (
    <SettingsTabContent value="files">
      <LargeText>SVGs</LargeText>

      {svgs.length === 0
        ? (
            <MutedText>No SVGs loaded</MutedText>
          )
        : (
            svgs.map(svg => <SVGCard key={svg.id} info={svg} />)
          )}
    </SettingsTabContent>
  )
}
