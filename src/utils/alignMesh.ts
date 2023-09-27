import { Box3, BufferGeometry, Mesh, Vector3 } from "three";

export function getBoundingBox(geometry: BufferGeometry, force = false) {
  if (force || geometry.boundingBox === null) {
    geometry.computeBoundingBox();
  }

  if (geometry.boundingBox === null) {
    throw new Error("Failed to compute bounding box");
  }

  return geometry.boundingBox;
}

export type AlignMode = "center" | "min" | "max" | "none";

export interface AlignOptions {
  modes: [AlignMode, AlignMode, AlignMode];
  relativeTo?: Vector3;
}

export function alignMesh(options: AlignOptions, mesh: Mesh) {
  const bounds = new Box3().setFromObject(mesh, true);
  const relativeTo = options.relativeTo ?? new Vector3();
  const translation = new Vector3();

  options.modes.forEach((mode, i) => {
    let value = 0;

    switch (mode) {
      case "center":
        value = (bounds.min.getComponent(i) + bounds.max.getComponent(i)) / 2;
        break;

      case "max":
        value = bounds.max.getComponent(i);
        break;

      case "min":
        value = bounds.min.getComponent(i);
        break;
    }

    value = relativeTo.getComponent(i) - value;

    translation.setComponent(i, value);
  });

  mesh.position.add(translation);
}
