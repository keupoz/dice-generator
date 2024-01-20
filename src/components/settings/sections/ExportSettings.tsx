import { Button } from "@/shadcn/components/ui/button";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import { exportObject } from "@/utils/exportObject";
import { FC } from "react";
import { SettingsSelect } from "../controls/SettingsSelect";

export const ExportSettings: FC = () => {
  const exportSettings = useExportSettings();

  function handleExport() {
    exportObject(exportSettings.exportObject);
  }

  return (
    <>
      <SettingsSelect
        label="Render mode"
        options={["Preview", "Render", "STL"]}
        value={exportSettings.renderMode}
        onChange={exportSettings.setRenderMode}
      />

      <SettingsSelect
        label="Render operation"
        options={["Subtract", "Union"]}
        value={exportSettings.renderOperation}
        onChange={exportSettings.setRenderOperation}
      />

      <Button onClick={handleExport}>Export STL</Button>
    </>
  );
};
