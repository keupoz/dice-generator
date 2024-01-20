import { FormControl, FormLabel, Grid } from "@mui/joy";
import { FC, PropsWithChildren } from "react";

export interface SettingsRowProps {
  label: string;
  labelSize?: number;
}

export const SettingsRow: FC<PropsWithChildren<SettingsRowProps>> = ({
  label,
  labelSize = 4,
  children,
}) => {
  return (
    <FormControl>
      <Grid container spacing={1} alignItems="center">
        <Grid xs={labelSize}>
          <FormLabel>{label}</FormLabel>
        </Grid>

        {children}
      </Grid>
    </FormControl>
  );
};
