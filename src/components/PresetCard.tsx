import type { InferOutput } from 'valibot'
import type { PresetSchema } from '~/utils/presets/schema'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Button, Card, Divider, Group, List, ListItem, Text } from '@mantine/core'
import { $presets } from '~/state/presets'
import { applyPreset } from '~/utils/presets/applyPreset'

export interface PresetCardProps {
  preset: InferOutput<typeof PresetSchema>
}

export function PresetCard({ preset }: PresetCardProps) {
  function deletePreset() {
    const newValue = { ...$presets.get() }
    delete newValue[preset.name]
    $presets.set(newValue)
  }

  return (
    <Card withBorder p={0}>
      <Group gap="xs" justify="space-between" p="xs">
        <Text>{preset.name}</Text>

        <Group gap="xs">
          <Button size="xs" onClick={() => applyPreset(preset)}>Apply</Button>

          <ActionIcon size="input-xs" color="red" onClick={deletePreset}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </ActionIcon>
        </Group>
      </Group>

      <Divider />

      <List py="xs" pr="xs" withPadding>
        <ListItem>Text font: {preset.general.textFont?.name ?? 'None'}</ListItem>
        <ListItem>Mark font: {preset.general.markFont?.name ?? 'None'}</ListItem>
        <ListItem>SVGs: {preset.general.svgs.map(svg => svg.name).join(', ') || 'None'}</ListItem>
      </List>
    </Card>
  )
}
