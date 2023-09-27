import {
  FormControl,
  FormLabel,
  Option,
  Select,
  SelectOwnProps,
} from "@mui/joy";
import { FC } from "react";

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
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <Select value={value} onChange={handleChange}>
        {options.map((option) => (
          <Option value={option} key={option}>
            {option}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
};
