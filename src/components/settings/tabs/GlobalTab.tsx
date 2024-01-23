import { AVAILABLE_OPERATIONS } from "@/components/three/csg/availableOperations";
import { Button } from "@/shadcn/components/ui/button";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  getExportObject,
  useExportSettings,
} from "@/stores/ExportSettingsStore";
import {
  baseOpacityAtom,
  showGridAtom,
  smoothCameraAtom,
} from "@/stores/SceneSettingsStore";
import { exportObject } from "@/utils/exportObject";
import { useAtom } from "jotai";
import { FC } from "react";
import { SettingsTabContent } from "../SettingsTabContent";
import { SettingsSelect } from "../controls/SettingsSelect";
import { SettingsSlider } from "../controls/SettingsSlider";
import { SettingsSwitch } from "../controls/SettingsSwitch";

export const GlobalTab: FC = () => {
  const [showGrid, setShowGrid] = useAtom(showGridAtom);
  const [smoothCamera, setSmoothCamera] = useAtom(smoothCameraAtom);
  const [baseOpacity, setBaseOpacity] = useAtom(baseOpacityAtom);

  const exportSettings = useExportSettings();

  function handleExport() {
    exportObject(getExportObject());
  }

  return (
    <SettingsTabContent value="global">
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

      <Separator />

      <SettingsSwitch
        label="Enable align"
        checked={exportSettings.enableAlign}
        onChange={(enableAlign) => useExportSettings.setState({ enableAlign })}
      />

      <SettingsSwitch
        label="Enable render"
        checked={exportSettings.enableRender}
        onChange={(enableRender) =>
          useExportSettings.setState({ enableRender })
        }
      />

      <SettingsSelect
        label="Render operation"
        options={Object.keys(AVAILABLE_OPERATIONS)}
        value={exportSettings.renderOperation}
        onChange={(renderOperation) =>
          useExportSettings.setState({ renderOperation })
        }
      />

      <Button onClick={handleExport}>Export STL</Button>
    </SettingsTabContent>
  );
};
