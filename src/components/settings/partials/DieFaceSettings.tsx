import { FaceInfo } from "@/components/dice/utils/types";
import { FC } from "react";
import { SettingsSlider } from "../controls/SettingsSlider";
import { SettingsSwitch } from "../controls/SettingsSwitch";
import { SettingsText } from "../controls/SettingsText";

export interface DieFaceSettingsProps {
  info: FaceInfo;
}

export const DieFaceSettings: FC<DieFaceSettingsProps> = ({ info }) => {
  const state = info.useStore();

  return (
    <>
      <SettingsText
        label="Text"
        value={state.text}
        onChange={(text) => info.useStore.setState({ text })}
      />

      <SettingsText
        label="Mark"
        value={state.mark}
        onChange={(mark) => info.useStore.setState({ mark })}
      />

      <SettingsSwitch
        label="Underscore"
        checked={state.isUnderscore}
        onChange={(isUnderscore) => info.useStore.setState({ isUnderscore })}
      />

      <SettingsSlider
        label="Gap"
        min={-2}
        max={2}
        step={0.1}
        value={state.markGap}
        onChange={(markGap) => info.useStore.setState({ markGap })}
      />

      <SettingsSlider
        label="Rotation"
        min={0}
        max={360}
        step={1}
        value={state.rotation}
        onChange={(rotation) => info.useStore.setState({ rotation })}
      />

      <SettingsSlider
        label="Offset X"
        min={-2}
        max={2}
        step={0.01}
        value={state.offsetX}
        onChange={(offsetX) => info.useStore.setState({ offsetX })}
      />

      <SettingsSlider
        label="Offset Y"
        min={-2}
        max={2}
        step={0.01}
        value={state.offsetY}
        onChange={(offsetY) => info.useStore.setState({ offsetY })}
      />
    </>
  );
};
