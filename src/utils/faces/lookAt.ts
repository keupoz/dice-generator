import mat4 from "@jscad/modeling/src/maths/mat4";
import vec3, { Vec3 } from "@jscad/modeling/src/maths/vec3";

// https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js#L283
export function lookAt(eye: Vec3, target: Vec3, up: Vec3) {
  const _x = vec3.create();
  const _y = vec3.create();
  const _z = vec3.create();

  vec3.subtract(_z, eye, target);

  if (vec3.squaredLength(_z) === 0) {
    _z[2] = 1;
  }

  vec3.normalize(_z, _z);
  vec3.cross(_x, up, _z);

  if (vec3.squaredLength(_x) === 0) {
    if (Math.abs(up[2]) === 1) {
      _z[0] += 0.0001;
    } else {
      _z[2] += 0.0001;
    }

    vec3.normalize(_z, _z);
    vec3.cross(_x, up, _z);
  }

  vec3.normalize(_x, _x);
  vec3.cross(_y, _z, _x);

  const matrix = mat4.create();

  matrix[0] = _x[0];
  matrix[4] = _y[0];
  matrix[8] = _z[0];
  matrix[1] = _x[1];
  matrix[5] = _y[1];
  matrix[9] = _z[1];
  matrix[2] = _x[2];
  matrix[6] = _y[2];
  matrix[10] = _z[2];

  return matrix;
}
