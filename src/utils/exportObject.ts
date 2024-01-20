import { useExportSettings } from "@/stores/ExportSettingsStore";
import { Object3D } from "three";
import { exportSTL } from "./exportSTL";

export function exportObject(object: Object3D | null, name?: string) {
  const oldMode = useExportSettings.getState().renderMode;

  useExportSettings.setState({ renderMode: "STL" });

  setTimeout(() => {
    if (object) {
      exportSTL(object, name);
    }

    useExportSettings.setState({ renderMode: oldMode });
  });
}
