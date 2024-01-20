import { Grid, Input } from "@mui/joy";
import { FC } from "react";
import { SettingsRow } from "./SettingsRow";

export interface SettingsTextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const SettingsText: FC<SettingsTextProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <SettingsRow label={label}>
      <Grid xs={8}>
        <Input
          type="text"
          size="sm"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </Grid>
    </SettingsRow>
  );
};
