import { Stack, Switch } from '@mantine/core'
import { memo } from 'react'
import { CollapseButton } from '../CollapseButton'

export interface FontFeaturesProps {
  options: string[]
  values: Record<string, boolean>
  onChange: (key: string, value: boolean) => void
}

export const FontFeatures = memo<FontFeaturesProps>(({ options, values, onChange }) => {
  if (!options.length) {
    return null
  }

  return (
    <CollapseButton label="Font features">
      <Stack gap="sm">
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
  )
})
