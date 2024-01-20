import { DieInfo } from "@/components/dice/utils/types";
import { exportObject } from "@/utils/exportObject";
import { focusObject } from "@/utils/focusObject";
import { Button, Divider, Grid } from "@mui/joy";
import { FC } from "react";
import { SettingsAccordion } from "../SettingsAccordion";
import { SettingsSlider } from "../controls/SettingsSlider";
import { SettingsSwitch } from "../controls/SettingsSwitch";
import { DieFaceSettings } from "./DieFaceSettings";
import { SettingsSection } from "./SettingsSection";

export interface DieSettingsProps {
  name: string;
  info: DieInfo;
}

export const DieSettings: FC<DieSettingsProps> = ({ name, info }) => {
  const state = info.useStore();

  const extraOptionsEntries = Object.entries(info.config.extraOptions);

  function handleFocus() {
    if (info.object) focusObject(info.object);
  }

  function handleExport() {
    exportObject(info.object, name);
  }

  return (
    <SettingsSection name={name}>
      <Grid container spacing={1}>
        <Grid xs={6}>
          <Button size="sm" fullWidth onClick={handleFocus}>
            Focus
          </Button>
        </Grid>

        <Grid xs={6}>
          <Button size="sm" fullWidth onClick={handleExport}>
            Export STL
          </Button>
        </Grid>
      </Grid>

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

      {extraOptionsEntries.length > 0 && <Divider />}

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

      <Divider />

      <SettingsAccordion>
        {info.faces.map((faceInfo, index) => (
          <DieFaceSettings key={index} info={faceInfo} index={index} />
        ))}
      </SettingsAccordion>
    </SettingsSection>
  );
};
