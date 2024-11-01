import { Button, Divider, Select, SimpleGrid, Switch } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useStore } from 'zustand'
import type { DieInfo } from '~/components/dice/utils/types'
import { Slider } from '~/components/ui/Slider'
import { exportObject } from '~/utils/exportObject'
import { focusObject } from '~/utils/focusObject'
import { DieFaceSettings } from './DieFaceSettings'

export interface DieSettingsProps {
  info: DieInfo
}

export function DieSettings({ info }: DieSettingsProps) {
  const visible = useStore(info.store, state => state.visible)
  const size = useStore(info.store, state => state.size)
  const fontScale = useStore(info.store, state => state.fontScale)
  const extraOptions = useStore(info.store, state => state.extraOptions)
  const setExtraOptions = useStore(info.store, state => state.setExtraOptions)

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
        checked={visible}
        onChange={e => info.store.setState({ visible: e.currentTarget.checked })}
      />

      <Slider
        label="Size"
        min={1}
        max={40}
        step={1}
        value={size}
        onChange={value => info.store.setState({ size: value })}
      />

      <Slider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontScale}
        onChange={value => info.store.setState({ fontScale: value })}
      />

      {extraOptionsEntries.length > 0 && <Divider />}

      {extraOptionsEntries.map(([key, inputConfig]) => (
        <Slider
          key={key}
          label={inputConfig.label}
          min={inputConfig.min}
          max={inputConfig.max}
          step={inputConfig.step}
          value={extraOptions[key] ?? inputConfig.value}
          onChange={value => setExtraOptions(key, value)}
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
