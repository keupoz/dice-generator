import type { SVGResult } from '~/state/svgs'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Card, Divider, Group, Image, Stack, Text, Tooltip } from '@mantine/core'
import prettyBytes from 'pretty-bytes'
import { memo } from 'react'
import { $svgs } from '~/state/svgs'
import { AtomSwitch } from '../inputs/AtomSwitch'
import classes from './SVGCard.module.scss'

export interface SVGCardProps {
  svg: SVGResult
}

export const SVGCard = memo<SVGCardProps>(({ svg }) => {
  const lastModified = new Date(svg.lastModified).toLocaleString()
  const url = `data:image/svg+xml,${encodeURIComponent(svg.raw)}`

  function handleDelete() {
    const newValue = { ...$svgs.get() }
    delete newValue[svg.id]
    $svgs.set(newValue)
  }

  return (
    <Card withBorder p={0}>
      <Group gap="xs" p="xs">
        <Group className={classes.preview}>
          <Image src={url} />
        </Group>

        <Stack gap="xs" flex="1">
          <Group justify="space-between" wrap="nowrap">
            <Tooltip label={svg.fileName}>
              <Text lineClamp={1}>{svg.fileName}</Text>
            </Tooltip>

            <ActionIcon color="red" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </ActionIcon>
          </Group>

          <AtomSwitch atom={svg.$scaleByViewBox} label="Scale by viewbox" />
        </Stack>
      </Group>

      <Divider />

      <Group gap="xs" p="xs" fz="sm" c="gray">
        <Tooltip label="Last modified">
          <span>{lastModified}</span>
        </Tooltip>

        <span>&bull;</span>
        <span>{prettyBytes(svg.fileSize)}</span>
      </Group>
    </Card>
  )
})
