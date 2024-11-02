import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Card, Divider, Group, Text } from '@mantine/core'
import { type FontInfo, setAppState } from '~/appState'

export interface FontCardProps {
  info: FontInfo
}

export function FontCard({ info }: FontCardProps) {
  function deleteFont() {
    setAppState(prev => ({
      userFonts: prev.userFonts.filter(font => font.id !== info.id),
    }))
  }

  return (
    <Card withBorder p={0}>
      <Group gap="xs" justify="space-between" p="xs">
        <Text>{info.font.fullName}</Text>

        <ActionIcon color="red" onClick={deleteFont}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </ActionIcon>
      </Group>

      <Divider />

      <Group gap="xs" p="xs" c="gray" fz="sm">
        <span>{info.font.version}</span>
      </Group>
    </Card>
  )
}
