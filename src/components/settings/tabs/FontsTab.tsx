import type { FC } from 'react'
import { Divider, Tabs } from '@mantine/core'
import { useStore } from 'zustand'
import { setAppState, useAppState } from '~/appState'
import { useCurrentFontsStore } from '~/contexts/CurrentFontsStoreContext'
import { SettingsSlider } from '../controls/SettingsSlider'
import { FontSelect } from '../partials/FontSelect/FontSelect'
import { SettingsTabContent } from '../SettingsTabContent'

export const FontsTab: FC = () => {
  const currentFontsStore = useCurrentFontsStore()

  const textFont = useStore(currentFontsStore, state => state.textFont)
  const markFont = useStore(currentFontsStore, state => state.markFont)

  const textFeatures = useStore(currentFontsStore, state => state.textFeatures)
  const markFeatures = useStore(currentFontsStore, state => state.markFeatures)

  const fontSegments = useAppState(state => state.fontSegments)
  const fontScale = useAppState(state => state.fontScale)
  const svgScale = useAppState(state => state.svgScale)
  const textDepth = useAppState(state => state.textDepth)

  return (
    <SettingsTabContent value="fonts">
      <Tabs defaultValue="text">
        <Tabs.List className="grid grid-cols-2">
          <Tabs.Tab value="text">Text</Tabs.Tab>
          <Tabs.Tab value="mark">Mark</Tabs.Tab>
        </Tabs.List>

        <SettingsTabContent value="text">
          <FontSelect
            defaultValue={textFont}
            features={textFeatures}
            onFont={(textFont) => {
              currentFontsStore.setState({ textFont })
            }}
            onFeatures={(textFeatures) => {
              currentFontsStore.setState({ textFeatures })
            }}
          />
        </SettingsTabContent>

        <SettingsTabContent value="mark">
          <FontSelect
            defaultValue={markFont}
            features={markFeatures}
            onFont={(markFont) => {
              currentFontsStore.setState({ markFont })
            }}
            onFeatures={(markFeatures) => {
              currentFontsStore.setState({ markFeatures })
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
        value={fontSegments}
        onChange={fontSegments => setAppState({ fontSegments })}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontScale}
        onChange={fontScale => setAppState({ fontScale })}
      />

      <SettingsSlider
        label="SVG scale"
        min={0.05}
        max={2}
        step={0.05}
        value={svgScale}
        onChange={svgScale => setAppState({ svgScale })}
      />

      <SettingsSlider
        label="Font depth"
        min={0.05}
        max={2}
        step={0.05}
        value={textDepth}
        onChange={textDepth => setAppState({ textDepth })}
      />
    </SettingsTabContent>
  )
}
