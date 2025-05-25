import type { FontInfo, SVGInfo } from '~/appState'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Stack, Text, Title } from '@mantine/core'
import { DropzoneFullScreen } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { setAppState } from '~/appState'
import { readFontFile } from '~/utils/files/readers/readFont'
import { readSVG } from '~/utils/files/readers/readSVG'

const SVG_MIME_TYPE = 'image/svg+xml'
const SVG_EXTENSION = '.svg'

const FONT_MIME_TYPES = [
  'font/ttf',
  'font/otf',
  'font/woff',
  'font/woff2',
]

const FONT_EXTENSIONS = [
  '.ttf',
  '.otf',
  '.woff',
  '.woff2',
  // Font collections
  '.ttc',
  '.dfont',
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
    const fontPromises: Promise<FontInfo[]>[] = []
    const svgPromises: Promise<SVGInfo>[] = []

    for (const file of files) {
      if (file.type === SVG_MIME_TYPE || file.name.endsWith(SVG_EXTENSION)) {
        svgPromises.push(readSVG(file))
      } else if (FONT_MIME_TYPES.includes(file.type) || FONT_EXTENSIONS.some(ext => file.name.endsWith(ext))) {
        fontPromises.push(file.arrayBuffer().then(readFontFile))
      }
    }

    const fontsPromise = Promise.all(fontPromises)
    const svgsPromise = Promise.all(svgPromises)

    const [fonts, svgs] = await Promise.all([fontsPromise, svgsPromise])
    const fontsFlat = fonts.flat()

    setAppState(prev => ({
      userFonts: fontsFlat.length ? [...prev.userFonts, ...fontsFlat] : prev.userFonts,
      userSVGs: svgs.length ? [...prev.userSVGs, ...svgs] : prev.userSVGs,
    }))

    showAddedNotification('font', fontsFlat)
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
