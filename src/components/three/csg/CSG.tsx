import "./extendR3F";

import {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { Group, Mesh } from "three";
import { CSGOperation, Evaluator } from "three-bvh-csg";
import { CSGContext } from "./CSGContext";
import { evaluateAll } from "./evaluateAll";

export interface CSGProps {
  disabled?: boolean;
  operation: CSGOperation;
}

export interface CSGRef {
  output: Mesh | null;
  update: () => void;
}

const evaluator = new Evaluator();
evaluator.attributes = ["position", "normal"];

/** Adapted from https://github.com/pmndrs/react-three-csg/blob/7b6d31616085476975f6592ff424948acb5bfcd4/src/index.tsx#L81 */
export const CSG = forwardRef<CSGRef, PropsWithChildren<CSGProps>>(
  ({ disabled, operation, children }, ref) => {
    const rootRef = useRef<Group>(null);
    const outputRef = useRef<Mesh>(null);

    const update = useCallback(() => {
      if (!outputRef.current) return;

      if (disabled || !rootRef.current) {
        outputRef.current.copy(new Mesh());
        return;
      }

      const result = evaluateAll(evaluator, rootRef.current, operation);

      if (!result) return;

      outputRef.current.copy(result);
    }, [disabled, operation]);

    useLayoutEffect(() => {
      update();
    });

    useImperativeHandle(ref, () => ({ output: outputRef.current, update }));

    return (
      <>
        <group ref={rootRef} visible={disabled}>
          <CSGContext.Provider value={update}>{children}</CSGContext.Provider>
        </group>

        <mesh ref={outputRef} raycast={() => null} />
      </>
    );
  }
);
