import { FaceInfo } from "@/components/dice/utils/types";
import { FC } from "react";
import { SettingsSlider } from "../controls/SettingsSlider";
import { SettingsSwitch } from "../controls/SettingsSwitch";
import { SettingsText } from "../controls/SettingsText";
import { SettingsSection } from "./SettingsSection";

export interface DieFaceSettingsProps {
  info: FaceInfo;
  index: number;
}

export const DieFaceSettings: FC<DieFaceSettingsProps> = ({ info, index }) => {
  const state = info.useStore();

  return (
    <SettingsSection name={`Face ${index + 1}`}>
      <SettingsText
        label="Text"
        value={state.text}
        onChange={(value) => info.useStore.setState({ text: value })}
      />

      <SettingsText
        label="Mark"
        value={state.mark}
        onChange={(value) => info.useStore.setState({ mark: value })}
      />

      <SettingsSwitch
        label="Underscore"
        checked={state.isUnderscore}
        onChange={(value) => info.useStore.setState({ isUnderscore: value })}
      />

      <SettingsSlider
        label="Gap"
        min={-2}
        max={2}
        step={0.1}
        value={state.markGap}
        onChange={(value) => info.useStore.setState({ markGap: value })}
      />

      <SettingsSlider
        label="Rotation"
        min={0}
        max={360}
        step={1}
        value={state.rotation}
        onChange={(value) => info.useStore.setState({ rotation: value })}
      />
    </SettingsSection>
  );
};
