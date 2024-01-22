import { Input } from "@/shadcn/components/ui/input";
import { Slider } from "@/shadcn/components/ui/slider";
import { FC, useId } from "react";
import { SettingsRow } from "./SettingsRow";

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
  const id = useId();

  return (
    <SettingsRow label={label} id={id}>
      <Slider
        className="col-span-5"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([value]) => value !== undefined && onChange(value)}
      />

      <Input
        className="col-span-3 h-8"
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.currentTarget.value))}
      />
    </SettingsRow>
  );
};
