import { createDieStore } from "./createDieStore";
import { createFaceInfo } from "./createFaceInfo";
import { DieConfig, DieInfo, DieInputConfig } from "./types";

export function createDieInfo<T extends Record<string, DieInputConfig>>(
  config: DieConfig<T>
): DieInfo {
  const useStore = createDieStore(config);
  const faces = config.faces.map(createFaceInfo);

  return {
    object: null,
    config: config as unknown as DieInfo["config"],
    useStore,
    faces,
  };
}
