import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, Stack, Text, Title } from '@mantine/core'
import { DropzoneFullScreen } from '@mantine/dropzone'
import { handleFiles } from '~/utils/handleFiles'
import classes from './AppDropzone.module.scss'

export function AppDropzone() {
  return (
    <DropzoneFullScreen classNames={classes} onDrop={handleFiles}>
      <Group gap="lg">
        <FontAwesomeIcon icon={faFile} size="4x" />

        <Stack gap="xs">
          <Title>Drop files here</Title>
          <Text>JSON, fonts and SVGs are accepted</Text>
        </Stack>
      </Group>
    </DropzoneFullScreen>
  )
}
