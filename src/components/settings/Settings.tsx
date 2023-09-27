import { Sheet } from "@mui/joy";
import { Font } from "fontkit";
import { FC } from "react";
import { SettingsAccordion } from "./SettingsAccordion";
import { AppSettings } from "./sections/AppSettings";
import { ExportSettings } from "./sections/ExportSettings";
import { FontSettings } from "./sections/FontSettings";
import { FontsGroup } from "./sections/FontsGroup";
import { SceneSettings } from "./sections/SceneSettings";
import { SettingsSection } from "./sections/SettingsSection";

export interface SettingsProps {
  fonts: Font[];
}

export const Settings: FC<SettingsProps> = ({ fonts }) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "lg",
        overflow: "auto",

        width: 320,
        maxHeight: "calc(100vh - 32px)",

        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 1,
      }}
    >
      <SettingsAccordion>
        <SettingsSection name="App settings">
          <AppSettings />
        </SettingsSection>

        <SettingsSection name="Export settings">
          <ExportSettings />
        </SettingsSection>

        <SettingsSection name="Scene settings">
          <SceneSettings />
        </SettingsSection>

        <FontsGroup fonts={fonts} />

        <SettingsSection name="Font settings">
          <FontSettings />
        </SettingsSection>
      </SettingsAccordion>
    </Sheet>
  );
};
