import type { WritableAtom } from '~/atoms/types'
import { Stack, Switch } from '@mantine/core'
import { memo } from 'react'
import { useAtom } from '~/atoms/useAtom'
import { CollapseButton } from '~/components/CollapseButton'

export interface FontFeaturesProps {
  atom: WritableAtom<Record<string, boolean>>
  options: string[]
}

export const FontFeatures = memo<FontFeaturesProps>(({ atom, options }) => {
  const values = useAtom(atom)

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
