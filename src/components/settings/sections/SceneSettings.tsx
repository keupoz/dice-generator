import {
  baseOpacityAtom,
  showGridAtom,
  smoothCameraAtom,
} from "@/stores/SceneSettingsStore";
import { useAtom } from "jotai";
import { FC } from "react";
import { SettingsSlider } from "../controls/SettingsSlider";
import { SettingsSwitch } from "../controls/SettingsSwitch";

export const SceneSettings: FC = () => {
  const [showGrid, setShowGrid] = useAtom(showGridAtom);
  const [smoothCamera, setSmoothCamera] = useAtom(smoothCameraAtom);
  const [baseOpacity, setBaseOpacity] = useAtom(baseOpacityAtom);

  return (
    <>
      <SettingsSwitch
        label="Show grid"
        checked={showGrid}
        onChange={setShowGrid}
      />

      <SettingsSwitch
        label="Smooth camera"
        checked={smoothCamera}
        onChange={setSmoothCamera}
      />

      <SettingsSlider
        label="Base opacity"
        min={0.1}
        max={1}
        step={0.1}
        value={baseOpacity}
        onChange={setBaseOpacity}
      />
    </>
  );
};
