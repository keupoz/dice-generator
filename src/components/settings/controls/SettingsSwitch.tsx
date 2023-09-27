import { FormControl, Switch, Typography } from "@mui/joy";
import { ChangeEventHandler, FC } from "react";

export interface SettingsSwitchProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const SettingsSwitch: FC<SettingsSwitchProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.currentTarget.checked);
  };

  return (
    <FormControl>
      <Typography
        component="label"
        endDecorator={<Switch checked={checked} onChange={handleChange} />}
        sx={{ userSelect: "none" }}
        justifyContent="space-between"
      >
        {label}
      </Typography>
    </FormControl>
  );
};
