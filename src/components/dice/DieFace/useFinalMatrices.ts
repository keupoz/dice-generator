import mat4, { Mat4 } from "@jscad/modeling/src/maths/mat4";
import { useMemo } from "react";

export function useFinalMatrices(baseMatrix: Mat4, instanceMatrices: Mat4[]) {
  return useMemo(() => {
    return instanceMatrices.map((instanceMatrix) => {
      return mat4.multiply(mat4.create(), instanceMatrix, baseMatrix);
    });
  }, [baseMatrix, instanceMatrices]);
}
