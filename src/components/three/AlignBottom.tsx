import { alignObject } from "@/utils/alignObject";
import { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import { Group } from "three";

export interface AlignBottomProps {
  disabled?: boolean;
}

export const AlignBottom: FC<PropsWithChildren<AlignBottomProps>> = ({
  disabled,
  children,
}) => {
  const rootRef = useRef<Group>(null);

  function update() {
    if (!rootRef.current) return;

    rootRef.current.position.set(0, 0, 0);

    if (!disabled) {
      rootRef.current.updateMatrixWorld();

      alignObject({ modes: ["none", "min", "none"] }, rootRef.current);
    }
  }

  useLayoutEffect(() => {
    update();
  });

  return <group ref={rootRef}>{children}</group>;
};
