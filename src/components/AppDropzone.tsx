import type { Font, FontCollection } from 'fontkit'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Stack, Text, Title } from '@mantine/core'
import { DropzoneFullScreen } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { type SVGInfo, useFontsStore } from '~/stores/FontSettingsStore'
import { flatFontCollection } from '~/utils/flatFontCollection'
import { readFont } from '~/utils/readFont'
import { readSVG } from '~/utils/readSVG'

const SVG_MIME_TYPE = 'image/svg+xml'
const FONT_MIME_TYPES = [
  'font/ttf',
  'font/otf',
  'font/woff',
  'font/woff2',
]

function getPluralEnding(array: ArrayLike<unknown>) {
  return array.length === 1 ? '' : 's'
}

function showAddedNotification(type: string, items: ArrayLike<unknown>) {
  if (items.length) {
    notifications.show({ message: `Added ${items.length} ${type}${getPluralEnding(items)}` })
  }
}

export function AppDropzone() {
  async function handleDrop(files: File[]) {
    const fontPromises: Promise<Font | FontCollection>[] = []
    const svgPromises: Promise<SVGInfo>[] = []

    for (const file of files) {
      if (file.type === SVG_MIME_TYPE) {
        svgPromises.push(readSVG(file))
      } else if (FONT_MIME_TYPES.includes(file.type)) {
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

    showAddedNotification('font', fonts)
    showAddedNotification('SVG', svgs)
  }

  return (
    <DropzoneFullScreen onDrop={handleDrop}>
      <Group gap="xl" justify="center" align="center" mih={220}>
        <FontAwesomeIcon icon={faFile} size="4x" />

        <Stack gap="xs">
          <Title>Drop files here</Title>
          <Text>Fonts and SVGs are accepted</Text>
        </Stack>
      </Group>
    </DropzoneFullScreen>
  )
}
