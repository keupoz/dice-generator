import { Box3, BoxHelper, Object3D } from "three";

const _box = new Box3();

// Adapted from https://github.com/mrdoob/three.js/blob/02d4c5aa091ea8b6137db5bf1ad38819308246e3/src/helpers/BoxHelper.js#L31
export function updateBoxHelperPrecise(helper: BoxHelper, object: Object3D) {
  Object.assign(helper, { object });

  _box.setFromObject(object, true);

  if (_box.isEmpty()) return;

  const { min, max } = _box;

  const position = helper.geometry.attributes.position;

  if (!position) return;

  const array = position.array;

  array[0] = max.x;
  array[1] = max.y;
  array[2] = max.z;
  array[3] = min.x;
  array[4] = max.y;
  array[5] = max.z;
  array[6] = min.x;
  array[7] = min.y;
  array[8] = max.z;
  array[9] = max.x;
  array[10] = min.y;
  array[11] = max.z;
  array[12] = max.x;
  array[13] = max.y;
  array[14] = min.z;
  array[15] = min.x;
  array[16] = max.y;
  array[17] = min.z;
  array[18] = min.x;
  array[19] = min.y;
  array[20] = min.z;
  array[21] = max.x;
  array[22] = min.y;
  array[23] = min.z;

  position.needsUpdate = true;

  helper.geometry.computeBoundingSphere();
}
