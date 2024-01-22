import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { SceneContent } from "./SceneContent";

export const Scene: FC = () => {
  return (
    <Canvas frameloop="demand">
      <SceneContent />
    </Canvas>
  );
};
