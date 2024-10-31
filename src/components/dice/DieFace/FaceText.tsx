import type { Text3DProps } from './Text3D'
import { SVG3D } from './SVG3D'
import { Text3D } from './Text3D'

export interface FaceTextProps extends Omit<Text3DProps, 'text'> {
  text: string | number
}

export function FaceText({ text, ...props }: FaceTextProps) {
  if (typeof text === 'number') {
    return <SVG3D id={text} />
  }

  return <Text3D text={text} {...props} />
}
