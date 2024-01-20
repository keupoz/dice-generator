import { useFontSettings } from "@/stores/FontSettingsStore";
import { FC } from "react";
import { SettingsSlider } from "../controls/SettingsSlider";

export const FontSettings: FC = () => {
  const segments = useFontSettings((store) => store.segments);
  const fontScale = useFontSettings((store) => store.fontScale);
  const depth = useFontSettings((store) => store.depth);

  return (
    <>
      <SettingsSlider
        label="Segments"
        min={1}
        max={24}
        step={1}
        value={segments}
        onChange={(segments) => useFontSettings.setState({ segments })}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontScale}
        onChange={(fontScale) => useFontSettings.setState({ fontScale })}
      />

      <SettingsSlider
        label="Font depth"
        min={0.05}
        max={2}
        step={0.05}
        value={depth}
        onChange={(depth) => useFontSettings.setState({ depth })}
      />
    </>
  );
};
