import type { FontResult } from '~/state/fonts'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Card, Divider, Group, Text } from '@mantine/core'
import { $userFonts } from '~/state/fonts'

export interface FontCardProps {
  font: FontResult
}

export function FontCard({ font }: FontCardProps) {
  function deleteFont() {
    const newValue = { ...$userFonts.get() }
    delete newValue[font.name]
    $userFonts.set(newValue)
  }

  return (
    <Card withBorder p={0}>
      <Group gap="xs" justify="space-between" p="xs">
        <Text>{font.name}</Text>

        <ActionIcon color="red" onClick={deleteFont}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </ActionIcon>
      </Group>

      <Divider />

      <Group gap="xs" p="xs" c="gray" fz="sm">
        <span>{font.value.version}</span>
      </Group>
    </Card>
  )
}
