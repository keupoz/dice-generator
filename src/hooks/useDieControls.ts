import { SceneContext } from "@/contexts";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import { exportSTL } from "@/utils/exportSTL";
import { button, useControls } from "leva";
import { useContext, useRef } from "react";
import { Object3D } from "three";

export function useDieControls(
  name: string,
  defaultSize: number,
  fontScale = 1
) {
  const { focusObject } = useContext(SceneContext);
  const setRenderMode = useExportSettings((store) => store.setRenderMode);

  const exportRef = useRef<Object3D>(null);

  const controls = useControls(
    name,
    {
      Focus: button(() => {
        if (exportRef.current === null) return;

        focusObject(exportRef.current, true);
      }),
      "Export STL": button(() => {
        setRenderMode("STL");
        setTimeout(() => {
          if (exportRef.current) {
            exportSTL(exportRef.current, name);
          }
        });
      }),
      hidden: { value: false, label: "Hidden" },
      size: { value: defaultSize, min: 1, max: 40, step: 1, label: "Size" },
      fontScale: {
        value: fontScale,
        min: 0.05,
        max: 2,
        step: 0.05,
        label: "Font scale",
      },
    },
    { collapsed: true }
  );

  return { exportRef, ...controls };
}
