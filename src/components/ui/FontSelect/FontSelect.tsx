import type { Font, FontVariationSettings } from 'fontkit'
import { Select } from '@mantine/core'
import { useCallback, useMemo } from 'react'
import type { FontInfo } from '~/appState'
import { useCombinedFonts } from '~/contexts/CombinedFontsContext'
import { collectFeatures } from '~/utils/collectFontFeatures'
import { Slider } from '../Slider'
import { FontFeatures } from './FontFeatures'

export interface FontSelectProps {
  label: string
  fontId: FontInfo['id']
  settings: FontVariationSettings
  features: Record<string, boolean>
  onFontId: (value: FontInfo['id']) => void
  onSettings: (value: FontVariationSettings) => void
  onFeatures: (value: Record<string, boolean>) => void
}

function collectVariationSettings(font: Font) {
  const result: FontVariationSettings = {}

  for (const [key, value] of Object.entries(font.variationAxes)) {
    result[key] = value.default
  }

  return result
}

const DEFAULT_VARIATION_NAME = 'Default'

export function FontSelect({ label, fontId, settings, features, onFontId, onSettings, onFeatures }: FontSelectProps) {
  const { data, findFont } = useCombinedFonts()
  const info = useMemo(() => findFont(fontId), [findFont, fontId])

  const baseVariationSettings = useMemo(() => {
    return collectVariationSettings(info.font)
  }, [info.font])

  const variations = useMemo(() => {
    return [DEFAULT_VARIATION_NAME, ...Object.keys(info.font.namedVariations)]
  }, [info.font.namedVariations])

  function handleFontIdChange(value: string | null) {
    if (value === null) {
      return
    }

    const info = findFont(value)

    onFontId(info.id)
    onSettings(collectVariationSettings(info.font))
    onFeatures(collectFeatures(info.font))
  }

  function selectVariation(name: string | null) {
    if (!name) {
      return
    }

    const variationSettings = name === DEFAULT_VARIATION_NAME ? baseVariationSettings : info.font.namedVariations[name]

    if (!variationSettings) {
      throw new Error(`Unknown variation name "${name}"`)
    }

    onSettings(variationSettings)
  }

  function handleAxisChange(key: string, value: number) {
    onSettings({ ...settings, [key]: value })
  }

  const handleFeatureChange = useCallback((key: string, value: boolean) => {
    onFeatures({ ...features, [key]: value })
  }, [features, onFeatures])

  return (
    <>
      <Select
        label={label}
        data={data}
        value={fontId}
        onChange={handleFontIdChange}
      />

      {variations.length > 1 && (
        <Select
          label="Variation"
          data={variations}
          defaultValue={DEFAULT_VARIATION_NAME}
          onChange={selectVariation}
        />
      )}

      {Object.entries(info.font.variationAxes).map(([key, value]) => (
        <Slider
          key={key}
          label={value.name}
          min={value.min}
          max={value.max}
          step={1}
          value={settings[key] ?? value.min}
          onChange={handleAxisChange.bind(null, key)}
        />
      ))}

      <FontFeatures
        options={info.font.availableFeatures}
        values={features}
        onChange={handleFeatureChange}
      />
    </>
  )
}
