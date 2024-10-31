import type { Font, FontCollection } from 'fontkit'
import { AppShell, Burger, Group, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useDropzone } from 'react-dropzone'
import { type SVGInfo, useFontsStore } from '~/stores/FontSettingsStore'
import { flatFontCollection } from '~/utils/flatFontCollection'
import { readFont } from '~/utils/readFont'
import { readSVG } from '~/utils/readSVG'
import { Scene } from './Scene'
import { Settings } from './settings/Settings'

// This magically enables memoization
const AppShellContent = (
  <>
    <AppShell.Aside>
      <ScrollArea>
        <Settings />
      </ScrollArea>
    </AppShell.Aside>

    <AppShell.Main h="100dvh">
      <Scene />
    </AppShell.Main>
  </>
)

export function AppContent() {
  const { getRootProps } = useDropzone({
    noClick: true,
    accept: {
      'font/ttf': ['.ttf'],
      'font/otf': ['.otf'],
      'font/woff': ['.woff'],
      'font/woff2': ['.woff2'],
      'image/svg+xml': ['.svg'],
    },
    async onDrop(files) {
      const fontPromises: Promise<Font | FontCollection>[] = []
      const svgPromises: Promise<SVGInfo>[] = []

      for (const file of files) {
        if (file.name.endsWith('.svg')) {
          svgPromises.push(readSVG(file))
        } else {
          fontPromises.push(readFont(file))
        }
      }

      const fontsPromise = Promise.all(fontPromises)
      const svgsPromise = Promise.all(svgPromises)

      const [fontCollection, svgs] = await Promise.all([fontsPromise, svgsPromise])
      const fonts = flatFontCollection(fontCollection)

      useFontsStore.setState(prev => ({
        fonts: fonts.length ? [...prev.fonts, ...fonts] : prev.fonts,
        svgs: svgs.length ? [...prev.svgs, ...svgs] : prev.svgs,
      }))
    },
  })

  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 56 }}
      aside={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      {...getRootProps()}
    >
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Text span fw={700} size="xl">Dice Generator</Text>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      {AppShellContent}
    </AppShell>
  )
}
