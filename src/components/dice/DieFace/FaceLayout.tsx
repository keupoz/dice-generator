import { alignObject } from "@/utils/alignObject";
import { createBoxFromObject } from "@/utils/createBoxFromObject";
import { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import { Group, Vector3 } from "three";

export interface FaceLayoutProps {
  isUnderscore: boolean;
  markGap: number;
}

export const FaceLayout: FC<PropsWithChildren<FaceLayoutProps>> = ({
  isUnderscore,
  markGap,
  children,
}) => {
  const rootRef = useRef<Group>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    rootRef.current.updateMatrixWorld();

    let [textObject, markObject] = rootRef.current.children;

    if (!textObject) {
      textObject = markObject;
      markObject = undefined;
    }

    if (!textObject) return;

    alignObject({ modes: ["center", "center", "center"] }, textObject);

    if (!markObject) return;

    const textBounds = createBoxFromObject(textObject);
    const textPivot = textBounds.getSize(new Vector3()).multiplyScalar(0.5);

    if (isUnderscore) {
      const offset = textPivot.y + markGap;

      alignObject({ modes: ["center", "max", "center"] }, markObject);

      markObject.position.y -= offset;
    } else {
      const offsetX = textPivot.x + markGap;
      const offsetY = textPivot.y;

      alignObject({ modes: ["min", "none", "center"] }, markObject);

      markObject.position.x += offsetX;
      markObject.position.y -= offsetY;
    }
  });

  return <group ref={rootRef}>{children}</group>;
};
