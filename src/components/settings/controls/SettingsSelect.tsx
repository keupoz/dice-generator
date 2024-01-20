import { Grid, Option, Select, SelectOwnProps } from "@mui/joy";
import { FC } from "react";
import { SettingsRow } from "./SettingsRow";

export interface SettingsSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SettingsSelect: FC<SettingsSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const handleChange: SelectOwnProps<string>["onChange"] = (_e, value) => {
    if (value) {
      onChange(value);
    }
  };

  return (
    <SettingsRow label={label}>
      <Grid xs={8}>
        <Select value={value} onChange={handleChange}>
          {options.map((option) => (
            <Option value={option} key={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Grid>
    </SettingsRow>
  );
};
