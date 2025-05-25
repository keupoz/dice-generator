import type { ChangeEvent } from 'react'
import type { SVGInfo } from '~/appState'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Box, Card, Divider, Group, Stack, Switch, Text, Tooltip } from '@mantine/core'
import prettyBytes from 'pretty-bytes'
import { memo } from 'react'
import { setAppState } from '~/appState'
import classes from './SVGCard.module.scss'

export interface SVGCardProps {
  info: SVGInfo
}

export const SVGCard = memo<SVGCardProps>(({ info }) => {
  const lastModified = new Date(info.lastModified).toLocaleString()

  function handleDelete() {
    setAppState(prev => ({
      userSVGs: prev.userSVGs.filter(svg => svg.id !== info.id),
    }))
  }

  function handleScaleToggle(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.checked

    setAppState(prev => ({
      userSVGs: prev.userSVGs.map((svg) => {
        if (svg.id !== info.id) {
          return svg
        }

        return { ...info, scaleByViewbox: value }
      }),
    }))
  }

  return (
    <Card withBorder p={0}>
      <Group gap="xs" p="xs">
        <Box
          className={classes.preview}
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: info.raw,
          }}
        />

        <Stack gap="xs" flex="1">
          <Group justify="space-between" wrap="nowrap">
            <Tooltip label={info.name}>
              <Text lineClamp={1}>{info.name}</Text>
            </Tooltip>

            <ActionIcon color="red" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </ActionIcon>
          </Group>

          <Switch
            label="Scale by viewbox"
            checked={info.scaleByViewbox}
            onChange={handleScaleToggle}
          />
        </Stack>
      </Group>

      <Divider />

      <Group gap="xs" p="xs" fz="sm" c="gray">
        <Tooltip label="Last modified">
          <span>{lastModified}</span>
        </Tooltip>

        <span>&bull;</span>
        <span>{prettyBytes(info.fileSize)}</span>
      </Group>
    </Card>
  )
})
