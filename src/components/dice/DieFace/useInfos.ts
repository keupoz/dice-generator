import {
  InstanceFaceConfig,
  getInstanceFaceInfo,
} from "@/utils/faces/getInstanceFaceInfo";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { useMemo } from "react";

export function useInfos(instances: InstanceFaceConfig[], geom: Geom3) {
  return useMemo(() => {
    return instances.map((config) => {
      return getInstanceFaceInfo(geom, config);
    });
  }, [instances, geom]);
}
