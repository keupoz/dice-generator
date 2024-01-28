import { getAlignment } from "@/utils/alignObject";
import { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import { Group, Object3D } from "three";

export interface AlignBottomProps {
  disabled?: boolean;
  alignBy?: Object3D | null;
}

export const AlignBottom: FC<PropsWithChildren<AlignBottomProps>> = ({
  disabled,
  alignBy,
  children,
}) => {
  const rootRef = useRef<Group>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    rootRef.current.position.set(0, 0, 0);

    if (!disabled) {
      rootRef.current.updateMatrixWorld();

      const target = alignBy ?? rootRef.current;
      const alignment = getAlignment(
        { modes: ["none", "min", "none"] },
        target
      );

      rootRef.current.position.add(alignment);
    }
  });

  return <group ref={rootRef}>{children}</group>;
};
