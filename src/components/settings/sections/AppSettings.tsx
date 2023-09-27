import { useColorScheme } from "@mui/joy";
import { FC } from "react";
import { SettingsSwitch } from "../controls/SettingsSwitch";

export const AppSettings: FC = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <SettingsSwitch
        label="Dark mode"
        checked={mode === "dark"}
        onChange={(value) => setMode(value ? "dark" : "light")}
      />
    </>
  );
};
