import type { Mat4 } from '@jscad/modeling/src/maths/mat4'
import '@jscad/modeling/src/maths/mat4'

declare module '@jscad/modeling/src/maths/mat4' {
  export function invert(out: Mat4, matrix: Mat4): Mat4
}
