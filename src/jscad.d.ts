import type { Mat4 } from '@jscad/modeling/src/maths/mat4'
import type { Vec3 } from '@jscad/modeling/src/maths/types'
import '@jscad/modeling/src/maths/mat4'

declare module '@jscad/modeling/src/maths/mat4' {
  function fromVectorRotation(out: Mat4, source: Vec3, target: Vec3): Mat4
}
