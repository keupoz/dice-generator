import { alignObject } from "@/utils/alignObject";
import { useMemo } from "react";
import { BufferGeometry, Material } from "three";
import { Brush } from "three-bvh-csg";

export function useTextBrush(
  textGeometry: BufferGeometry | null,
  fontMaterial: Material | undefined
) {
  return useMemo(() => {
    if (!textGeometry) return null;

    const brush = new Brush(textGeometry, fontMaterial);

    alignObject({ modes: ["center", "center", "center"] }, brush);

    return brush;
  }, [fontMaterial, textGeometry]);
}
