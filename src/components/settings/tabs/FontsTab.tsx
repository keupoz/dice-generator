import type { FC } from 'react'
import { Divider, Tabs } from '@mantine/core'
import { useMemo } from 'react'
import { useFontSettings, useFontsStore } from '~/stores/FontSettingsStore'
import { getFirstItem } from '~/utils/getFirstItem'
import { SettingsSlider } from '../controls/SettingsSlider'
import { FontSelect } from '../partials/FontSelect/FontSelect'
import { SettingsTabContent } from '../SettingsTabContent'

export const FontsTab: FC = () => {
  const fontSettings = useFontSettings()
  const fonts = useFontsStore(state => state.fonts)

  const fontOptions = useMemo(() => {
    return fonts.map(font => font.fullName)
  }, [fonts])

  return (
    <SettingsTabContent value="fonts">
      <Tabs defaultValue="text">
        <Tabs.List className="grid grid-cols-2">
          <Tabs.Tab value="text">Text</Tabs.Tab>
          <Tabs.Tab value="mark">Mark</Tabs.Tab>
        </Tabs.List>

        <SettingsTabContent value="text">
          <FontSelect
            options={fontOptions}
            defaultValue={fontSettings.textFont ?? getFirstItem(fonts)}
            features={fontSettings.textFeatures}
            onFont={(textFont) => {
              useFontSettings.setState({ textFont })
            }}
            onFeatures={(textFeatures) => {
              useFontSettings.setState({ textFeatures })
            }}
          />
        </SettingsTabContent>

        <SettingsTabContent value="mark">
          <FontSelect
            options={fontOptions}
            defaultValue={fontSettings.markFont ?? getFirstItem(fonts)}
            features={fontSettings.markFeatures}
            onFont={(markFont) => {
              useFontSettings.setState({ markFont })
            }}
            onFeatures={(markFeatures) => {
              useFontSettings.setState({ markFeatures })
            }}
          />
        </SettingsTabContent>
      </Tabs>

      <Divider />

      <SettingsSlider
        label="Segments"
        min={1}
        max={24}
        step={1}
        value={fontSettings.segments}
        onChange={segments => useFontSettings.setState({ segments })}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontSettings.fontScale}
        onChange={fontScale => useFontSettings.setState({ fontScale })}
      />

      <SettingsSlider
        label="SVG scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontSettings.svgScale}
        onChange={svgScale => useFontSettings.setState({ svgScale })}
      />

      <SettingsSlider
        label="Font depth"
        min={0.05}
        max={2}
        step={0.05}
        value={fontSettings.depth}
        onChange={depth => useFontSettings.setState({ depth })}
      />
    </SettingsTabContent>
  )
}
