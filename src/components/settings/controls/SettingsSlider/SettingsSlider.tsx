import type { FC } from 'react'
import { NumberInput, Slider } from '@mantine/core'
import classes from './SettingsSlider.module.scss'

export interface SettingsSliderProps {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

export const SettingsSlider: FC<SettingsSliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  function handleInputChange(value: string | number) {
    if (typeof value === 'string') {
      value = +value
    }

    onChange(value)
  }

  return (
    <div className={classes.wrapper}>
      <NumberInput
        label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInputChange}
      />

      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}

        label={null}
        size={2}
        thumbSize={16}
        className={classes.slider}
      />
    </div>
  )
}
