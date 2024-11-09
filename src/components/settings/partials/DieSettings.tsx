import { Button, Divider, Select, SimpleGrid } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useStore } from 'zustand'
import { Slider } from '~/components/ui/Slider'
import { StoreSlider } from '~/components/ui/StoreSlider'
import { StoreSwitch } from '~/components/ui/StoreSwitch'
import { SUFFIX_MM } from '~/consts'
import type { DieInfo } from '~/dice/utils/types'
import { exportObject } from '~/utils/files/exporters/exportObject'
import { focusObject } from '~/utils/focusObject'
import { DieFaceSettings } from './DieFaceSettings'

export interface DieSettingsProps {
  info: DieInfo
}

export function DieSettings({ info }: DieSettingsProps) {
  const extraOptions = useStore(info.store, state => state.extraOptions)
  const setExtraOptions = useStore(info.store, state => state.setExtraOptions)

  const extraOptionsEntries = Object.entries(info.config.extraOptions)

  function handleFocus() {
    if (info.object) {
      focusObject(info.object)
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
      <Divider />

      <SimpleGrid cols={2} spacing="xs">
        <Button onClick={handleFocus}>Focus</Button>
        <Button onClick={handleExport}>Export STL</Button>
      </SimpleGrid>

      <StoreSwitch
        store={info.store}
        storeProp="visible"
        label="Visible"
      />

      <StoreSlider
        store={info.store}
        storeProp="size"
        label={info.config.sizeLabel ?? 'Size'}
        suffix={SUFFIX_MM}
        min={1}
        max={40}
        step={1}
      />

      <StoreSlider
        store={info.store}
        storeProp="fontScale"
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
      />

      {extraOptionsEntries.length > 0 && <Divider />}

      {extraOptionsEntries.map(([key, inputConfig]) => (
        <Slider
          key={key}
          label={inputConfig.label}
          suffix={inputConfig.suffix}
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

      {currentFace && <DieFaceSettings key={currentFace.name} info={currentFace} />}
    </>
  )
}
