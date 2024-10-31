import type { Font, FontVariationSettings } from 'fontkit'
import { Select } from '@mantine/core'
import { useCallback, useMemo, useState } from 'react'
import { useCombinedFonts } from '~/contexts/CombinedFontsContext'
import { collectFeatures } from '~/utils/collectFontFeatures'
import { SettingsSlider } from '../../controls/SettingsSlider'
import { FontFeatures } from './FontFeatures'

export interface FontSelectProps {
  defaultValue: Font
  features: Record<string, boolean>
  onFont: (value: Font) => void
  onFeatures: (value: Record<string, boolean>) => void
}

function collectVariationSettings(font: Font) {
  const result: FontVariationSettings = {}

  for (const [key, value] of Object.entries(font.variationAxes)) {
    result[key] = value.default
  }

  return result
}

export function FontSelect({
  defaultValue,
  features,
  onFont,
  onFeatures,
}: FontSelectProps) {
  const [baseFont, setBaseFont] = useState(defaultValue)
  const { data, findFont } = useCombinedFonts()

  const defaultVariationSettings = useMemo(() => {
    return collectVariationSettings(defaultValue)
  }, [defaultValue])

  const [selectedVariation, setSelectedVariation] = useState('Default')
  const [variationSettings, setVariationSettings]
    = useState<FontVariationSettings>(defaultVariationSettings)

  const variations = useMemo(() => {
    return ['Default', ...Object.keys(baseFont.namedVariations)]
  }, [baseFont.namedVariations])

  function handleBaseChange(fontName: string | null) {
    if (!fontName) {
      return
    }

    const font = findFont(fontName)

    setBaseFont(font)
    setVariationSettings(collectVariationSettings(font))

    onFont(font)
    onFeatures(collectFeatures(font))
  }

  function handleVariationChange(value: string | null) {
    if (!value) {
      return
    }

    const variationSettings
      = baseFont.namedVariations[value] ?? defaultVariationSettings

    setSelectedVariation(value)
    setVariationSettings(variationSettings)
    onFont(baseFont.getVariation(variationSettings))
  }

  function handleAxisChange(key: string, value: number) {
    setVariationSettings((prev) => {
      const newState = { ...prev, [key]: value }
      const font = baseFont.getVariation(newState)

      onFont(font)

      return newState
    })
  }

  const handleFeatureChange = useCallback(
    (key: string, value: boolean) => {
      onFeatures({ ...features, [key]: value })
    },
    [features, onFeatures],
  )

  return (
    <>
      <Select
        label="Font"
        data={data}
        value={baseFont.fullName}
        onChange={handleBaseChange}
      />

      {variations.length > 1 && (
        <Select
          label="Variation"
          data={variations}
          value={selectedVariation}
          onChange={handleVariationChange}
        />
      )}

      {Object.entries(baseFont.variationAxes).map(([key, value]) => (
        <SettingsSlider
          key={key}
          label={value.name}
          min={value.min}
          max={value.max}
          step={1}
          value={variationSettings[key] ?? value.min}
          onChange={handleAxisChange.bind(null, key)}
        />
      ))}

      <FontFeatures
        options={baseFont.availableFeatures}
        values={features}
        onChange={handleFeatureChange}
      />
    </>
  )
}
