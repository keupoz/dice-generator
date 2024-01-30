import { FC } from "react";
import { SVG3D } from "./SVG3D";
import { Text3D, Text3DProps } from "./Text3D";

export interface FaceTextProps extends Omit<Text3DProps, "text"> {
  text: string | number;
}

export const FaceText: FC<FaceTextProps> = ({ text, ...props }) => {
  if (typeof text === "number") return <SVG3D id={text} />;

  return <Text3D text={text} {...props} />;
};
