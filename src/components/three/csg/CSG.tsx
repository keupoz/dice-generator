import "./extendR3F";

import { useForceUpdate } from "@/hooks/useForceUpdate";
import { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import { Group, Mesh } from "three";
import { CSGOperation, Evaluator } from "three-bvh-csg";
import { CSGContext } from "./CSGContext";
import { evaluateAll } from "./evaluateAll";

export interface CSGProps {
  disabled?: boolean;
  operation: CSGOperation;
}

const evaluator = new Evaluator();
evaluator.attributes = ["position", "normal"];

/** Adapted from https://github.com/pmndrs/react-three-csg/blob/7b6d31616085476975f6592ff424948acb5bfcd4/src/index.tsx#L81 */
export const CSG: FC<PropsWithChildren<CSGProps>> = ({
  disabled,
  operation,
  children,
}) => {
  const rootRef = useRef<Group>(null);
  const outputRef = useRef<Mesh>(null);

  const forceUpdate = useForceUpdate();

  function update() {
    if (!outputRef.current) return;

    if (disabled || !rootRef.current) {
      outputRef.current.copy(new Mesh());
    } else {
      const result = evaluateAll(evaluator, rootRef.current, operation);

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
