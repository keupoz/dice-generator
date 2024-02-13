import "./extendR3F";

import { useForceUpdate } from "@/hooks/useForceUpdate";
import { useExportSettings } from "@/stores/ExportSettingsStore";
import { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import { Group, Mesh } from "three";
import { CSGContext } from "./CSGContext";
import { getEvaluator } from "./availableEvaluators";
import { getOperation } from "./availableOperations";

export interface CSGProps {
  disabled?: boolean;
}

/** Adapted from https://github.com/pmndrs/react-three-csg/blob/7b6d31616085476975f6592ff424948acb5bfcd4/src/index.tsx#L81 */
export const CSG: FC<PropsWithChildren<CSGProps>> = ({
  disabled,
  children,
}) => {
  const rootRef = useRef<Group>(null);
  const outputRef = useRef<Mesh>(null);

  const forceUpdate = useForceUpdate();

  const renderOperation = useExportSettings((store) => store.renderOperation);
  const renderMethod = useExportSettings((store) => store.renderMethod);

  const operation = getOperation(renderOperation);

  function update() {
    if (!outputRef.current) return;

    if (disabled || !rootRef.current) {
      outputRef.current.copy(new Mesh());
    } else {
      const evaluate = getEvaluator(renderMethod);
      const result = evaluate(rootRef.current, operation);

      if (result) outputRef.current.copy(result);
    }
  }

  useLayoutEffect(() => {
    update();
  });

  return (
    <>
      <group ref={rootRef} visible={disabled}>
        <CSGContext.Provider value={forceUpdate}>
          {children}
        </CSGContext.Provider>
      </group>

      <mesh ref={outputRef} raycast={() => null} />
    </>
  );
};
