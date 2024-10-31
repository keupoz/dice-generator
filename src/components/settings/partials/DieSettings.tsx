import type { FC } from 'react'
import { Button, Divider, Select, SimpleGrid, Switch } from '@mantine/core'
import { useMemo, useState } from 'react'
import type { DieInfo } from '~/components/dice/utils/types'
import { exportObject } from '~/utils/exportObject'
import { focusObject } from '~/utils/focusObject'
import { SettingsSlider } from '../controls/SettingsSlider'
import { DieFaceSettings } from './DieFaceSettings'

export interface DieSettingsProps {
  info: DieInfo
}

export const DieSettings: FC<DieSettingsProps> = ({ info }) => {
  const state = info.useStore()

  const extraOptionsEntries = Object.entries(info.config.extraOptions)

  function handleFocus() {
    if (info.object) {
      focusObject(info.object, true)
    }
  }

  function handleExport() {
    exportObject(info.object, info.config.name)
  }

  const [currentFace, setCurrentFace] = useState(info.faces[0])

  const faceOptions = useMemo(() => {
    return info.faces.map(faceInfo => faceInfo.name)
  }, [info.faces])

  function selectFace(name: string | null) {
    if (!name) {
      return
    }

    const face = info.faces.find(faceInfo => faceInfo.name === name)

    setCurrentFace(face)
  }

  return (
    <>
      <SimpleGrid cols={2} spacing="xs">
        <Button onClick={handleFocus}>Focus</Button>
        <Button onClick={handleExport}>Export STL</Button>
      </SimpleGrid>

      <Switch
        label="Visible"
        checked={state.visible}
        onChange={e => info.useStore.setState({ visible: e.currentTarget.checked })}
      />

      <SettingsSlider
        label="Size"
        min={1}
        max={40}
        step={1}
        value={state.size}
        onChange={value => info.useStore.setState({ size: value })}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={state.fontScale}
        onChange={value => info.useStore.setState({ fontScale: value })}
      />

      {extraOptionsEntries.length > 0 && <Divider />}

      {extraOptionsEntries.map(([key, inputConfig]) => (
        <SettingsSlider
          key={key}
          label={inputConfig.label}
          min={inputConfig.min}
          max={inputConfig.max}
          step={inputConfig.step}
          value={state.extraOptions[key] ?? inputConfig.value}
          onChange={value => state.setExtraOptions(key, value)}
        />
      ))}

      <Divider />

      <Select
        label="Face"
        data={faceOptions}
        value={currentFace?.name ?? ''}
        onChange={selectFace}
      />

      {currentFace && (
        <DieFaceSettings key={currentFace.name} info={currentFace} />
      )}
    </>
  )
}
