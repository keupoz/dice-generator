import { useExportSettings } from "@/stores/ExportSettingsStore";
import { exportSTL } from "@/utils/exportSTL";
import { Button } from "@mui/joy";
import { FC } from "react";
import { SettingsSelect } from "../controls/SettingsSelect";

export const ExportSettings: FC = () => {
  const exportSettings = useExportSettings();

  function handleExport() {
    const oldMode = exportSettings.renderMode;

    exportSettings.setRenderMode("STL");

    setTimeout(() => {
      if (exportSettings.exportObject) {
        exportSTL(exportSettings.exportObject);
      }

      exportSettings.setRenderMode(oldMode);
    });
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
