import { Divider, SimpleGrid, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { FontSelect } from '~/components/inputs/fonts/FontSelect'
import { SUFFIX_MM } from '~/consts'
import { $extrusionDepth, $segments } from '~/state/faces'
import { $fontScale, currentMarkFont, currentTextFont } from '~/state/fonts'
import { $svgScale } from '~/state/svgs'

export function FontsTab() {
  return (
    <>
      <Tabs defaultValue="text">
        <TabsList grow>
          <TabsTab value="text">Text</TabsTab>
          <TabsTab value="mark">Mark</TabsTab>
        </TabsList>

        <TabsPanel value="text" pt="xs">
          <FontSelect atoms={currentTextFont} label="Text font" />
        </TabsPanel>

        <TabsPanel value="mark" pt="xs">
          <FontSelect atoms={currentMarkFont} label="Mark font" />
        </TabsPanel>
      </Tabs>

      <Divider />

      <AtomSlider atom={$segments} label="Curve segments" min={1} max={24} step={1} />

      <SimpleGrid cols={2} spacing="xs">
        <AtomSlider atom={$fontScale} label="Font scale" min={0.05} max={2} step={0.05} />
        <AtomSlider atom={$svgScale} label="SVG scale" min={0.05} max={2} step={0.05} />
      </SimpleGrid>

      <AtomSlider atom={$extrusionDepth} label="Text depth" min={0.05} max={2} step={0.05} suffix={SUFFIX_MM} />
    </>
  )
}
