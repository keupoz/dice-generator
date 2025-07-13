import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Stack, Text, Title } from '@mantine/core'
import { DropzoneFullScreen } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { loadFonts } from '~/state/fonts'
import { loadSVGs } from '~/state/svgs'
import classes from './AppDropzone.module.scss'

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

function getPluralEnding(n: number) {
  return n === 1 ? '' : 's'
}

function showAddedNotification(type: string, addedCount: number) {
  if (addedCount) {
    notifications.show({ message: `Added ${addedCount} ${type}${getPluralEnding(addedCount)}` })
  }
}

export function AppDropzone() {
  async function handleDrop(files: File[]) {
    const fonts: File[] = []
    const svgs: File[] = []

    for (const file of files) {
      if (file.type === SVG_MIME_TYPE || file.name.endsWith(SVG_EXTENSION)) {
        svgs.push(file)
      } else if (FONT_MIME_TYPES.includes(file.type) || FONT_EXTENSIONS.some(ext => file.name.endsWith(ext))) {
        fonts.push(file)
      }
    }

    await Promise.all([
      loadFonts(fonts),
      loadSVGs(svgs),
    ])

    showAddedNotification('font', fonts.length)
    showAddedNotification('SVG', svgs.length)
  }

  return (
    <DropzoneFullScreen classNames={classes} onDrop={handleDrop}>
      <Group gap="lg">
        <FontAwesomeIcon icon={faFile} size="4x" />

        <Stack gap="xs">
          <Title>Drop files here</Title>
          <Text>Fonts and SVGs are accepted</Text>
        </Stack>
      </Group>
    </DropzoneFullScreen>
  )
}
