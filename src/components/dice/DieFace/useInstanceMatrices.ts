import { InstanceFace } from "@/utils/faces/getInstanceFaceInfo";
import mat4 from "@jscad/modeling/src/maths/mat4";
import { useMemo } from "react";

export function useInstanceMatrices(
  infos: InstanceFace[],
  fontScale: number,
  depth: number
) {
  return useMemo(() => {
    return infos.map((info) => {
      const result = mat4.create();
      const scale = info.length * fontScale;

      mat4.translate(result, result, info.center);
      mat4.multiply(result, result, info.rotationMatrix);
      mat4.scale(result, result, [scale, scale, depth]);

      return result;
    });
  }, [depth, fontScale, infos]);
}
