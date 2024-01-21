import { DieInfo } from "@/components/dice/utils/types";
import { Button } from "@/shadcn/components/ui/button";
import { exportObject } from "@/utils/exportObject";
import { focusObject } from "@/utils/focusObject";
import { FC } from "react";
import { SettingsAccordion } from "../SettingsAccordion";
import { SettingsAccordionItem } from "../SettingsAccordionItem";
import { SettingsSlider } from "../controls/SettingsSlider";
import { SettingsSwitch } from "../controls/SettingsSwitch";
import { DieFaceSettings } from "./DieFaceSettings";

export interface DieSettingsProps {
  info: DieInfo;
}

export const DieSettings: FC<DieSettingsProps> = ({ info }) => {
  const name = info.config.name;
  const state = info.useStore();

  const extraOptionsEntries = Object.entries(info.config.extraOptions);

  function handleFocus() {
    if (info.object) focusObject(info.object);
  }

  function handleExport() {
    exportObject(info.object, name);
  }

  return (
    <SettingsAccordionItem name={name}>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleFocus}>Focus</Button>

        <Button onClick={handleExport}>Export STL</Button>
      </div>

      <SettingsSwitch
        label="Visible"
        checked={state.visible}
        onChange={(value) => info.useStore.setState({ visible: value })}
      />

      <SettingsSlider
        label="Size"
        min={1}
        max={40}
        step={1}
        value={state.size}
        onChange={(value) => info.useStore.setState({ size: value })}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={state.fontScale}
        onChange={(value) => info.useStore.setState({ fontScale: value })}
      />

      {extraOptionsEntries.length > 0 && <div className="border-b" />}

      {extraOptionsEntries.map(([key, inputConfig]) => (
        <SettingsSlider
          key={key}
          label={inputConfig.label}
          min={inputConfig.min}
          max={inputConfig.max}
          step={inputConfig.step}
          value={state.extraOptions[key] ?? inputConfig.value}
          onChange={(value) => state.setExtraOptions(key, value)}
        />
      ))}

      <div className="border-b" />

      <SettingsAccordion>
        {info.faces.map((faceInfo, index) => (
          <DieFaceSettings key={index} info={faceInfo} index={index} />
        ))}
      </SettingsAccordion>
    </SettingsAccordionItem>
  );
};
