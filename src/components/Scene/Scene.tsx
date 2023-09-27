import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { SceneContent } from "../SceneContent";
import classes from "./Scene.module.scss";

export const Scene: FC = () => {
  return (
    <>
      <div className={classes.Container}>
        <Canvas frameloop="demand">
          <SceneContent />
        </Canvas>
      </div>
    </>
  );
};
