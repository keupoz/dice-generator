import { Slider as MantineSlider, NumberInput } from '@mantine/core'
import classes from './Slider.module.scss'

export interface SliderProps {
  label: string
  suffix?: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

export function Slider({ label, suffix, min, max, step, value, onChange }: SliderProps) {
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
        suffix={suffix}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInputChange}
      />

      <MantineSlider
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
