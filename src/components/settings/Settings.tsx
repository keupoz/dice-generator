import { Card } from "@/shadcn/components/ui/card";
import { Font } from "fontkit";
import { FC, memo } from "react";
import { mapDice } from "../dice/utils/registry";
import { SettingsAccordion } from "./SettingsAccordion";
import { SettingsAccordionItem } from "./SettingsAccordionItem";
import { AppSettings } from "./sections/AppSettings";
import { DieSettings } from "./sections/DieSettings";
import { ExportSettings } from "./sections/ExportSettings";
import { FontSettings } from "./sections/FontSettings";
import { FontsGroup } from "./sections/FontsGroup";
import { SceneSettings } from "./sections/SceneSettings";

export interface SettingsProps {
  fonts: Font[];
}

export const Settings: FC<SettingsProps> = memo(({ fonts }) => {
  return (
    <Card className="w-80 max-h-[calc(100vh-32px)] absolute top-4 left-4 z-10 px-3 overflow-auto">
      <SettingsAccordion>
        <SettingsAccordionItem name="App settings">
          <AppSettings />
        </SettingsAccordionItem>

        <SettingsAccordionItem name="Export settings">
          <ExportSettings />
        </SettingsAccordionItem>

        <SettingsAccordionItem name="Scene settings">
          <SceneSettings />
        </SettingsAccordionItem>

        <FontsGroup fonts={fonts} />

        <SettingsAccordionItem name="Font settings">
          <FontSettings />
        </SettingsAccordionItem>

        <SettingsAccordionItem name="Dice settings">
          <SettingsAccordion>
            {mapDice((name, info) => (
              <DieSettings key={name} name={name} info={info} />
            ))}
          </SettingsAccordion>
        </SettingsAccordionItem>
      </SettingsAccordion>
    </Card>
  );
});
