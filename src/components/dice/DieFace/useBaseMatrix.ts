import mat4 from "@jscad/modeling/src/maths/mat4";
import { degToRad } from "@jscad/modeling/src/utils";
import { useMemo } from "react";

export function useBaseMatrix(
  defaultRotation: number,
  offsetX: number,
  offsetY: number,
  rotation: number
) {
  return useMemo(() => {
    const result = mat4.create();

    mat4.translate(result, result, [offsetX, offsetY, 0]);
    mat4.rotateZ(result, result, defaultRotation + degToRad(rotation));

    return result;
  }, [defaultRotation, offsetX, offsetY, rotation]);
}
