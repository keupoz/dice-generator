import { alignObject, getBoundingBox } from "@/utils/alignObject";
import { useMemo } from "react";
import { BufferGeometry, Material, Vector3 } from "three";
import { Brush } from "three-bvh-csg";

export function useMarkBrush(
  textGeometry: BufferGeometry | null,
  markGeometry: BufferGeometry | null,
  fontMaterial: Material | undefined,
  isUnderscore: boolean,
  markGap: number
) {
  return useMemo(() => {
    if (!textGeometry || !markGeometry) return null;

    const brush = new Brush(markGeometry, fontMaterial);

    const textBounds = getBoundingBox(textGeometry);
    const textPivot = textBounds.getSize(new Vector3()).multiplyScalar(0.5);

    if (isUnderscore) {
      const offset = textPivot.y + markGap;

      alignObject({ modes: ["center", "max", "center"] }, brush);

      brush.position.y -= offset;
    } else {
      const offsetX = textPivot.x + markGap;
      const offsetY = textPivot.y;

      alignObject({ modes: ["min", "none", "center"] }, brush);

      brush.position.x += offsetX;
      brush.position.y -= offsetY;
    }

    return brush;
  }, [fontMaterial, isUnderscore, markGap, markGeometry, textGeometry]);
}
