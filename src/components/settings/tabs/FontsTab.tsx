import { Divider, SimpleGrid, Tabs } from '@mantine/core'
import { useStore } from 'zustand'
import { appState } from '~/appState'
import { FontSelect } from '~/components/ui/FontSelect'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { SUFFIX_MM } from '~/consts'
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
        <Tabs.List>
          <Tabs.Tab value="text">Text</Tabs.Tab>
          <Tabs.Tab value="mark">Mark</Tabs.Tab>
        </Tabs.List>

        <SettingsTabContent value="text">
          <FontSelect
            label="Text font"
            defaultValue={textFont}
            features={textFeatures}
            onFont={textFont => currentFontsStore.setState({ textFont })}
            onFeatures={textFeatures => currentFontsStore.setState({ textFeatures })}
          />
        </SettingsTabContent>

        <SettingsTabContent value="mark">
          <FontSelect
            label="Mark font"
            defaultValue={markFont}
            features={markFeatures}
            onFont={markFont => currentFontsStore.setState({ markFont })}
            onFeatures={markFeatures => currentFontsStore.setState({ markFeatures })}
          />
        </SettingsTabContent>
      </Tabs>

      <Divider />

      <StoreSlider
        store={appState}
        storeProp="fontSegments"
        label="Curve segments"
        min={1}
        max={24}
        step={1}
      />

      <SimpleGrid cols={2} spacing="xs">
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
      </SimpleGrid>

      <StoreSlider
        store={appState}
        storeProp="textDepth"
        label="Text depth"
        suffix={SUFFIX_MM}
        min={0.05}
        max={2}
        step={0.05}
      />
    </SettingsTabContent>
  )
}
