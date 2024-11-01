import { Divider, Tabs } from '@mantine/core'
import { useStore } from 'zustand'
import { appState } from '~/appState'
import { FontSelect } from '~/components/ui/FontSelect'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { useCurrentFontsStore } from '~/contexts/CurrentFontsStoreContext'
import { SettingsTabContent } from '../SettingsTabContent'

export function FontsTab() {
  const currentFontsStore = useCurrentFontsStore()

  const textFont = useStore(currentFontsStore, state => state.textFont)
  const markFont = useStore(currentFontsStore, state => state.markFont)

  const textFeatures = useStore(currentFontsStore, state => state.textFeatures)
  const markFeatures = useStore(currentFontsStore, state => state.markFeatures)

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

      <StoreSlider
        store={appState}
        storeProp="fontSegments"
        label="Segments"
        min={1}
        max={24}
        step={1}
      />

      <StoreSlider
        store={appState}
        storeProp="fontScale"
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
      />

      <StoreSlider
        store={appState}
        storeProp="svgScale"
        label="SVG scale"
        min={0.05}
        max={2}
        step={0.05}
      />

      <StoreSlider
        store={appState}
        storeProp="textDepth"
        label="Font depth"
        min={0.05}
        max={2}
        step={0.05}
      />
    </SettingsTabContent>
  )
}
