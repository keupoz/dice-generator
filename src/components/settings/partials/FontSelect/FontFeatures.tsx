import type { FC } from 'react'
import { Switch } from '@mantine/core'
import { memo } from 'react'
import { SettingsAccordion } from '../../SettingsAccordion'
import { SettingsAccordionItem } from '../../SettingsAccordionItem'

export interface FontFeaturesProps {
  options: string[]
  values: Record<string, boolean>
  onChange: (key: string, value: boolean) => void
}

export const FontFeatures: FC<FontFeaturesProps> = memo(
  ({ options, values, onChange }) => {
    if (!options.length) {
      return null
    }

    return (
      <SettingsAccordion>
        <SettingsAccordionItem name="Features">
          {options.map(feature => (
            <Switch
              key={feature}
              label={feature}
              checked={values[feature] ?? false}
              onChange={e => onChange(feature, e.currentTarget.checked)}
            />
          ))}
        </SettingsAccordionItem>
      </SettingsAccordion>
    )
  },
)
