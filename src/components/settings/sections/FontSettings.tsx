import { useFontSettings } from "@/stores/FontSettingsStore";
import { FC } from "react";
import { SettingsSlider } from "../controls/SettingsSlider";

export const FontSettings: FC = () => {
  const segments = useFontSettings((store) => store.segments);
  const setSegments = useFontSettings((store) => store.setSegments);

  const fontScale = useFontSettings((store) => store.fontScale);
  const setFontScale = useFontSettings((store) => store.setFontScale);

  const depth = useFontSettings((store) => store.depth);
  const setDepth = useFontSettings((store) => store.setDepth);

  return (
    <>
      <SettingsSlider
        label="Segments"
        min={1}
        max={24}
        step={1}
        value={segments}
        onChange={setSegments}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontScale}
        onChange={setFontScale}
      />

      <SettingsSlider
        label="Font depth"
        min={0.05}
        max={2}
        step={0.05}
        value={depth}
        onChange={setDepth}
      />
    </>
  );
};
