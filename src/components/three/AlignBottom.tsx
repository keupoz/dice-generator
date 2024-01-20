import { alignObject } from "@/utils/alignObject";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { Group } from "three";

export interface AlignBottomProps {
  disabled?: boolean;
}

export const AlignBottom: FC<PropsWithChildren<AlignBottomProps>> = ({
  disabled,
  children,
}) => {
  const rootRef = useRef<Group>(null);

  const update = useCallback(() => {
    if (!rootRef.current) return;

    if (disabled) {
      rootRef.current.position.set(0, 0, 0);
    } else {
      alignObject({ modes: ["none", "min", "none"] }, rootRef.current);
    }
  }, [disabled]);

  useLayoutEffect(() => {
    update();
  });

  return <group ref={rootRef}>{children}</group>;
};
