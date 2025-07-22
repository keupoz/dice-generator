import type { Mat4 } from '@jscad/modeling/src/maths/mat4'
import type { Vec3 } from '@jscad/modeling/src/maths/vec3'
import vec3 from '@jscad/modeling/src/maths/vec3'

// https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js#L283
export function lookAt(out: Mat4, eye: Vec3, target: Vec3, up: Vec3) {
  const _x = vec3.create()
  const _y = vec3.create()
  const _z = vec3.create()

  vec3.subtract(_z, eye, target)

  if (vec3.squaredLength(_z) === 0) {
    _z[2] = 1
  }

  vec3.normalize(_z, _z)
  vec3.cross(_x, up, _z)

  if (vec3.squaredLength(_x) === 0) {
    if (Math.abs(up[2]) === 1) {
      _z[0] += 0.0001
    } else {
      _z[2] += 0.0001
    }

    vec3.normalize(_z, _z)
    vec3.cross(_x, up, _z)
  }

  vec3.normalize(_x, _x)
  vec3.cross(_y, _z, _x)

  out[0] = _x[0]
  out[4] = _y[0]
  out[8] = _z[0]
  out[1] = _x[1]
  out[5] = _y[1]
  out[9] = _z[1]
  out[2] = _x[2]
  out[6] = _y[2]
  out[10] = _z[2]

  return out
}
