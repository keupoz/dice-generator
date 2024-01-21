import { FC, useMemo } from "react";
import { Object3D } from "three";

export interface CloneProps {
  object: Object3D;
}

export const Clone: FC<CloneProps> = ({ object }) => {
  const clone = useMemo(() => {
    return object.clone();
  }, [object]);

  return <primitive object={clone} />;
};
