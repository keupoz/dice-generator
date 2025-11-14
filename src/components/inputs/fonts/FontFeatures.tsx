import type { Atom } from 'atomous'
import { useAtomValue } from '@atomous/react'
import { Stack, Switch } from '@mantine/core'
import { memo } from 'react'
import { CollapseButton } from '~/components/CollapseButton'

export interface FontFeaturesProps {
  atom: Atom<Record<string, boolean>>
  options: string[]
}

export const FontFeatures = memo<FontFeaturesProps>(({ atom, options }) => {
  const values = useAtomValue(atom)

  if (!options.length) return null

  function onChange(key: string, value: boolean) {
    atom.set({ ...atom.get(), [key]: value })
  }

  return (
    <Stack gap={0}>
      <CollapseButton label="Font features">
        <Stack gap="sm" pt="sm">
          {options.map(feature => (
            <Switch
              key={feature}
              label={feature}
              checked={values[feature] ?? false}
              onChange={e => onChange(feature, e.currentTarget.checked)}
            />
          ))}
        </Stack>
      </CollapseButton>
    </Stack>
  )
})
