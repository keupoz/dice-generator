import { Grid, Switch } from "@mui/joy";
import { ChangeEventHandler, FC } from "react";
import { SettingsRow } from "./SettingsRow";

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
    <SettingsRow label={label} labelSize={10}>
      <Grid xs={2}>
        <Switch checked={checked} onChange={handleChange} />
      </Grid>
    </SettingsRow>
  );
};
