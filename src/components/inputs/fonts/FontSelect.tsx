import type { ComboboxData } from '@mantine/core'
import type { ReactNode } from 'react'
import type { CurrentFontAtoms } from '~/state/fonts'
import { Button, Menu, MenuDropdown, MenuItem, MenuTarget, Select, Stack } from '@mantine/core'
import { useMemo } from 'react'
import { useAtom } from '~/atoms/useAtom'
import { $builtinFonts, $userFonts } from '~/state/fonts'
import { alphabetical } from '~/utils/array/alphabetical'
import { Slider } from '../slider/Slider'
import { FontFeatures } from './FontFeatures'

const DEFAULT_VARIATION_NAME = 'Default'

export interface FontSelectProps {
  atoms: CurrentFontAtoms
  label: ReactNode
}

export function FontSelect({ atoms, label }: FontSelectProps) {
  const currentBaseFont = useAtom(atoms.$baseFont)
  const settings = useAtom(atoms.$variationSettings)

  const builtinFonts = useAtom($builtinFonts)
  const userFonts = useAtom($userFonts)
  const data = useMemo<ComboboxData>(() => {
    return [
      { group: 'Built-in fonts', items: alphabetical(Object.keys(builtinFonts), key => key) },
      { group: 'User fonts', items: alphabetical(Object.keys(userFonts), key => key) },
    ]
  }, [builtinFonts, userFonts])

  const variations = useMemo(() => {
    return [DEFAULT_VARIATION_NAME, ...Object.keys(currentBaseFont?.value.namedVariations ?? {})]
  }, [currentBaseFont?.value.namedVariations])

  function onFontChange(value: string | null) {
    if (value === null) return
    atoms.set(value)
  }

  function setVariation(value: string) {
    if (value === DEFAULT_VARIATION_NAME) return atoms.reset()
    if (currentBaseFont === undefined) return

    const variation = currentBaseFont.value.namedVariations[value]
    atoms.$variationSettings.set(variation ?? {})
  }

  function onSettingsChange(key: string, value: number) {
    atoms.$variationSettings.set({ ...atoms.$variationSettings.get(), [key]: value })
  }

  return (
    <Stack gap="xs">
      <Select
        label={label}
        data={data}
        value={currentBaseFont?.name}
        onChange={onFontChange}
      />

      {variations.length > 1 && (
        <Menu>
          <MenuTarget>
            <Button variant="default">Choose preset</Button>
          </MenuTarget>

          <MenuDropdown>
            {variations.map(variation => <MenuItem key={variation} onClick={setVariation.bind(null, variation)}>{variation}</MenuItem>)}
          </MenuDropdown>
        </Menu>
      )}

      {currentBaseFont && Object.entries(currentBaseFont.value.variationAxes).map(([key, value]) => (
        <Slider
          key={key}
          label={value.name}
          min={value.min}
          max={value.max}
          step={1}
          value={settings[key] ?? value.default}
          onChange={onSettingsChange.bind(null, key)}
        />
      ))}

      <FontFeatures atom={atoms.$features} options={currentBaseFont?.value.availableFeatures ?? []} />
    </Stack>
  )
}
