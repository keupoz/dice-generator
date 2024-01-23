import { updateBoxHelperPrecise } from "@/utils/updateBoxHelperPrecise";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { useCallback } from "react";
import { BoxHelper, Object3D } from "three";
import { getFirstItem } from "../utils/getFirstItem";
import { useConst } from "./useConst";

export function useHighlight() {
  const invalidate = useThree((state) => state.invalidate);

  const highlight = useConst(() => {
    const result = new BoxHelper(new Object3D(), 0xffffff);

    result.visible = false;

    return result;
  });

  const updateHighlight = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      updateBoxHelperPrecise(highlight, getFirstItem(e.intersections).object);
      highlight.visible = true;

      invalidate();
    },
    [highlight, invalidate]
  );

  const hideHighlight = useCallback(() => {
    highlight.visible = false;
    invalidate();
  }, [highlight, invalidate]);

  return { highlight, updateHighlight, hideHighlight };
}
