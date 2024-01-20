import { Box3, Mesh, Object3D } from "three";

export function createBoxFromObject(object: Object3D, precise?: boolean) {
  const box = new Box3();

  object.traverseVisible((child) => {
    if (!(child instanceof Mesh)) return;

    box.expandByObject(child, precise);
  });

  return box;
}
