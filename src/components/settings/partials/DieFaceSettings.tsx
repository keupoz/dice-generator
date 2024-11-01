import { Switch } from '@mantine/core'
import { useStore } from 'zustand'
import type { FaceInfo } from '~/components/dice/utils/types'
import { SettingsSlider } from '../controls/SettingsSlider'
import { SettingsSVGSelect } from '../controls/SettingsSVGSelect'

export interface DieFaceSettingsProps {
  info: FaceInfo
}

export function DieFaceSettings({ info }: DieFaceSettingsProps) {
  const text = useStore(info.store, state => state.text)
  const mark = useStore(info.store, state => state.mark)
  const isUnderscore = useStore(info.store, state => state.isUnderscore)
  const markGap = useStore(info.store, state => state.markGap)
  const rotation = useStore(info.store, state => state.rotation)
  const offsetX = useStore(info.store, state => state.offsetX)
  const offsetY = useStore(info.store, state => state.offsetY)

  return (
    <>
      <SettingsSVGSelect
        label="Text"
        value={text}
        onChange={text => info.store.setState({ text })}
      />

      <SettingsSVGSelect
        label="Mark"
        value={mark}
        onChange={mark => info.store.setState({ mark })}
      />

      <Switch
        label="Align mark as underscore"
        checked={isUnderscore}
        onChange={e => info.store.setState({ isUnderscore: e.currentTarget.checked })}
      />

      <SettingsSlider
        label="Gap"
        min={-2}
        max={2}
        step={0.1}
        value={markGap}
        onChange={markGap => info.store.setState({ markGap })}
      />

      <SettingsSlider
        label="Rotation"
        min={0}
        max={360}
        step={1}
        value={rotation}
        onChange={rotation => info.store.setState({ rotation })}
      />

      <SettingsSlider
        label="Offset X"
        min={-2}
        max={2}
        step={0.01}
        value={offsetX}
        onChange={offsetX => info.store.setState({ offsetX })}
      />

      <SettingsSlider
        label="Offset Y"
        min={-2}
        max={2}
        step={0.01}
        value={offsetY}
        onChange={offsetY => info.store.setState({ offsetY })}
      />
    </>
  )
}
