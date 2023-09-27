import { FormControl, FormLabel, Grid, Input, Slider } from "@mui/joy";
import { FC } from "react";

export interface SettingsSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const SettingsSlider: FC<SettingsSliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <Grid container spacing={2} alignItems="center">
        <Grid xs={8}>
          <Slider
            valueLabelDisplay="auto"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(_e, value) => onChange(value as number)}
          />
        </Grid>

        <Grid xs={4}>
          <Input
            type="number"
            size="sm"
            value={value}
            slotProps={{ input: { min, max, step } }}
            onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
