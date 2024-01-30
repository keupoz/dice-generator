import { createForceUpdateContext } from "@/hooks/useForceUpdate";

export const [FaceLayoutContext, useUpdateFaceLayout] =
  createForceUpdateContext();
