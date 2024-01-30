import { useUpdateCSG } from "@/components/three/csg/CSGContext";
import { FONT_MATERIAL } from "@/materials";
import { useFontSettings, useFontsStore } from "@/stores/FontSettingsStore";
import { getBoundingBox } from "@/utils/alignObject";
import { getSVGGeometry } from "@/utils/fonts/getSVGGeometry";
import { FC, memo, useMemo } from "react";
import { Vector3 } from "three";
import { useUpdateFaceLayout } from "./FaceLayoutContext";

export interface SVG3DProps {
  id: number;
}

export const SVG3D: FC<SVG3DProps> = memo(({ id }) => {
  useUpdateFaceLayout();
  useUpdateCSG();

  const svgs = useFontsStore((state) => state.svgs);
  const segments = useFontSettings((state) => state.segments);
  const fontScale = useFontSettings((state) => state.fontScale);
  const svgScale = useFontSettings((state) => state.svgScale);

  const svg = useMemo(() => {
    return svgs.find((svg) => svg.id === id) ?? null;
  }, [id, svgs]);

  const geometry = useMemo(() => {
    if (!svg) return null;

    return getSVGGeometry(svg, segments);
  }, [segments, svg]);

  if (geometry === null) return null;

  const bounds = getBoundingBox(geometry);
  const size = bounds.getSize(new Vector3());

  const viewboxScale = svg?.scaleByViewbox ? svg.viewboxScale : null;
  const boxScale = viewboxScale ?? 1 / Math.max(size.x, size.y);
  const scale = (boxScale * svgScale) / fontScale;

  return (
    <group scale-x={scale} scale-y={-scale}>
      <brush geometry={geometry} material={FONT_MATERIAL} />
    </group>
  );
});
