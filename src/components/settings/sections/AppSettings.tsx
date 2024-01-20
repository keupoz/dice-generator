import { useTheme } from "@/shadcn/components/theme-provider";
import { FC } from "react";
import { SettingsSwitch } from "../controls/SettingsSwitch";

export const AppSettings: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <SettingsSwitch
        label="Dark mode"
        checked={theme === "dark"}
        onChange={(value) => setTheme(value ? "dark" : "light")}
      />
    </>
  );
};
